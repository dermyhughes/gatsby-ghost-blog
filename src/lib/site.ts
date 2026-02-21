import siteConfig from '../utils/siteConfig';

export const siteUrl = (process.env.SITEURL || siteConfig.siteUrl).replace(/\/$/, '');

export const withSiteUrl = (pathOrUrl?: string | null) => {
  if (!pathOrUrl) {
    return null;
  }

  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;

  return new URL(normalizedPath, `${siteUrl}/`).toString();
};

export const canonicalFromPath = (pathname: string) => withSiteUrl(pathname) || siteUrl;
