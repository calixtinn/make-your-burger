const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/ingredientes': {
        target: 'http://localhost:3000'
      },
      '/status': {
        target: 'http://localhost:3000'
      },
      '/burgers': {
        target: 'http://localhost:3000'
      }
    }
  }
})
