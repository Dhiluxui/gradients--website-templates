import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        collections: resolve(__dirname, 'collections.html'),
        animatedGradients: resolve(__dirname, 'animated-gradients.html'),
        noisyGrainy: resolve(__dirname, 'noisy-grainy.html'),
        smoothBlend: resolve(__dirname, 'smooth-blend.html'),
        aiGenerated: resolve(__dirname, 'ai-generated.html'),
        shader: resolve(__dirname, 'shader.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        request: resolve(__dirname, 'request.html'),
        faq: resolve(__dirname, 'faq.html'),
        signIn: resolve(__dirname, 'sign-in.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
  server: {
    port: 5174,
    open: false,
  },
});

