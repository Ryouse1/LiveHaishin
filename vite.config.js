import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsx: 'automatic'
  },
  preview: {
    allowedHosts: ['livehaishin.onrender.com']
  }
})
