import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { figureUploadPlugin } from './server/figure-upload-plugin';

export default defineConfig({ plugins: [react(), figureUploadPlugin()], base: './' });
