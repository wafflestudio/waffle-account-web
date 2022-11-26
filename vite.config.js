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
        'oauth/callback/google': resolve(__dirname, 'oauth/callback/google.html'),
        'oauth/callback/kakao': resolve(__dirname, 'oauth/callback/kakao.html'),
        'oauth/callback/github': resolve(__dirname, 'oauth/callback/github.html'),
        'oauth/callback/apple': resolve(__dirname, 'oauth/callback/apple.html'),
        'oauth/callback/naver': resolve(__dirname, 'oauth/callback/naver.html')
      }
    }
  }
})