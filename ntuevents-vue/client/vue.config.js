//const fs = require('fs');
module.exports = {
  configureWebpack: {
  },
  devServer: {
    host: 'localhost',
    hot: true,
    port: 8080,
    open: 'Chrome',
    disableHostCheck: true,
    proxy: {
      '^/api': {
        disableHostCheck: true,
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      }
    }
  }
}
