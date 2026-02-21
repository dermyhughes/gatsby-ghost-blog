import GhostContentAPI from '@tryghost/content-api';
import fs from 'node:fs';
import path from 'node:path';
import type { GhostPage, GhostPost, GhostSettings, GhostTag } from './ghost-types';

type GhostRuntimeConfig = {
  apiUrl?: string;
  contentApiKey?: string;
};

type GhostConfigFile = {
  development?: GhostRuntimeConfig;
  production?: GhostRuntimeConfig;
};

const readGhostConfigFile = (): GhostConfigFile => {
  const configCandidates = ['.ghost.json', '.ghost'];

  for (const candidate of configCandidates) {
    const filePath = path.join(process.cwd(), candidate);

    if (!fs.existsSync(filePath)) {
      continue;
    }

    try {
      const rawConfig = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(rawConfig) as GhostConfigFile;
    } catch {
      continue;
    }
  }

  return {};
};

const environment = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const fileConfig = readGhostConfigFile()[environment] || {};

const apiUrl = process.env.GHOST_API_URL || fileConfig.apiUrl;
const contentApiKey = process.env.GHOST_CONTENT_API_KEY || fileConfig.contentApiKey;

if (!apiUrl || !contentApiKey || /<key>/.test(contentApiKey)) {
  throw new Error(
    'GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Set them in Netlify environment variables or .ghost.json/.ghost.',
  );
}

const api = new GhostContentAPI({
  url: apiUrl,
  key: contentApiKey,
  version: 'v5.0',
});

const POST_INCLUDE = 'tags,authors';
const TAG_INCLUDE = 'count.posts';

let settingsPromise: Promise<GhostSettings> | null = null;
let postsPromise: Promise<GhostPost[]> | null = null;
let pagesPromise: Promise<GhostPage[]> | null = null;
let tagsPromise: Promise<GhostTag[]> | null = null;
let collisionCheckPromise: Promise<void> | null = null;

const sortByPublishedAtDesc = <T extends { published_at?: string | null }>(entries: T[]) =>
  entries.sort((a, b) => {
    const left = a.published_at ? new Date(a.published_at).getTime() : 0;
    const right = b.published_at ? new Date(b.published_at).getTime() : 0;

    return right - left;
  });

const normalizePost = (post: GhostPost): GhostPost => ({
  ...post,
  tags: post.tags || [],
  primary_tag: post.primary_tag || null,
});

const normalizePage = (page: GhostPage): GhostPage => ({
  ...page,
});

export const getGhostSettings = async () => {
  if (!settingsPromise) {
    settingsPromise = api.settings.browse() as Promise<GhostSettings>;
  }

  return settingsPromise;
};

export const getAllPosts = async () => {
  if (!postsPromise) {
    postsPromise = (
      api.posts.browse({
        include: POST_INCLUDE,
        limit: 'all',
        order: 'published_at desc',
        filter: 'visibility:public',
      }) as Promise<GhostPost[]>
    ).then((posts) => sortByPublishedAtDesc(posts.map(normalizePost)));
  }

  return postsPromise;
};

export const getAllPages = async () => {
  if (!pagesPromise) {
    pagesPromise = (
      api.pages.browse({
        include: POST_INCLUDE,
        limit: 'all',
        order: 'published_at desc',
        filter: 'visibility:public',
      }) as Promise<GhostPage[]>
    ).then((pages) => sortByPublishedAtDesc(pages.map(normalizePage)));
  }

  return pagesPromise;
};

export const getAllTags = async () => {
  if (!tagsPromise) {
    tagsPromise = (
      api.tags.browse({
        include: TAG_INCLUDE,
        limit: 'all',
        order: 'name asc',
        filter: 'visibility:public',
      }) as Promise<GhostTag[]>
    ).then((tags) =>
      tags
        .filter((tag) => tag.visibility !== 'internal')
        .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })),
    );
  }

  return tagsPromise;
};

export const getPostBySlug = async (slug: string) => {
  const posts = await getAllPosts();

  return posts.find((post) => post.slug === slug) || null;
};

export const getPageBySlug = async (slug: string) => {
  const pages = await getAllPages();

  return pages.find((page) => page.slug === slug) || null;
};

export const getTagBySlug = async (slug: string) => {
  const tags = await getAllTags();

  return tags.find((tag) => tag.slug === slug) || null;
};

export const getPostsByTagSlug = async (tagSlug: string) => {
  const posts = await getAllPosts();

  return posts.filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
};

export const assertNoPageTagCollisions = async () => {
  if (!collisionCheckPromise) {
    collisionCheckPromise = Promise.all([getAllPages(), getAllTags()]).then(([pages, tags]) => {
      const pageSlugs = new Set(pages.map((page) => page.slug));
      const collisions = tags
        .map((tag) => tag.slug)
        .filter((tagSlug) => pageSlugs.has(tagSlug))
        .sort();

      if (collisions.length > 0) {
        throw new Error(
          `Ghost page/tag slug collisions detected: ${collisions.join(
            ', ',
          )}. Rename either the page slug or tag slug before building.`,
        );
      }
    });
  }

  return collisionCheckPromise;
};
