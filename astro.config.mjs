// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite'; // 1. Import the Tailwind v4 compilation engine
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://vercel.app',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()], // 2. Hook Tailwind straight into Astro's core compiler loop
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
});
