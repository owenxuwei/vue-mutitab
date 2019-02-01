module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/connect': {
        target: 'http://192.168.103.251:6006'
      }
    }
  }
}