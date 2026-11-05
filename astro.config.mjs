import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://aryan-ashok-portfolio.vercel.app',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});
