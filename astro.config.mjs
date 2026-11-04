import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://aryan.dev', // Can be updated with real custom domain
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});
