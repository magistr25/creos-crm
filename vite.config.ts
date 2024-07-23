import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
    base: './',
    plugins: [
        react(),
        createHtmlPlugin({
            inject: {
                data: {
                    csp: `
            <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:;">
          `
                }
            }
        })
    ],
    build: {
        outDir: 'dist',
        assetsDir: 'assets'
    }
});

