module.exports = {
  build: {
    // vendor lib
    vendor: ['axios']
  },
  loading: {
    color: '#4fc08d',
    failedColor: '#bf5050',
    duration: 1500
  },
  head: {
    title: 'Nuxt vue blog'
  },
  generate: {
    routes: [
      '/pists/1'
    ]
  }
}