import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import clerk from '@clerk/astro';

export default defineConfig({
    integrations: [
        clerk(),
        react(),
    ],
    adapter: cloudflare(),
    output: 'server',
});
