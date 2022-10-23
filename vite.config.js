const { resolve } = require('path');
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        register: resolve(__dirname, 'register/index.html'),
        signin: resolve(__dirname, 'signin/index.html'),
        'signin/success': resolve(__dirname, 'signin/success.html'),
        'oauth/callback/kakao': resolve(__dirname, 'oauth/callback/kakao.html')
      }
    }
  }
})