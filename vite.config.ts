import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/creos-crm/',
    plugins: [react(),
        createHtmlPlugin({
            inject: {
                data: {
                    csp: `
            <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:;">
          `
                }
            }
        })],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        },
        outDir: 'build',
        assetsDir: 'assets',
        chunkSizeWarningLimit: 1000
    }
});
