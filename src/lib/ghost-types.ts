export interface GhostNavigationItem {
  label: string;
  url: string;
}

export interface GhostTag {
  name: string;
  slug: string;
  description?: string | null;
  feature_image?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  visibility?: string;
  url?: string;
  count?: {
    posts?: number;
  };
}

export interface GhostAuthor {
  name?: string;
  slug?: string;
  profile_image?: string | null;
  bio?: string | null;
}

export interface GhostPost {
  id: string;
  title: string;
  slug: string;
  html: string;
  plaintext?: string | null;
  excerpt?: string | null;
  custom_excerpt?: string | null;
  feature_image?: string | null;
  featured?: boolean;
  visibility?: string;
  published_at?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  twitter_image?: string | null;
  canonical_url?: string | null;
  url?: string | null;
  primary_tag?: GhostTag | null;
  tags: GhostTag[];
  authors?: GhostAuthor[];
  codeinjection_head?: string | null;
  codeinjection_foot?: string | null;
  codeinjection_styles?: string | null;
  reading_time?: number | null;
}

export interface GhostPage {
  id: string;
  title: string;
  slug: string;
  html: string;
  plaintext?: string | null;
  excerpt?: string | null;
  custom_excerpt?: string | null;
  feature_image?: string | null;
  visibility?: string;
  published_at?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  twitter_image?: string | null;
  canonical_url?: string | null;
  url?: string | null;
  codeinjection_head?: string | null;
  codeinjection_foot?: string | null;
  codeinjection_styles?: string | null;
}

export interface GhostSettings {
  title: string;
  description: string;
  logo?: string | null;
  icon?: string | null;
  cover_image?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  lang?: string | null;
  timezone?: string | null;
  navigation?: GhostNavigationItem[];
  codeinjection_head?: string | null;
  codeinjection_foot?: string | null;
  codeinjection_styles?: string | null;
}
