import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITEURL || 'https://dermothughes.com';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
});
