const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  externals: {
    vue: 'Vue'
  },
  css: [],
  js: [
    '//cdn.jsdeliver.net/npm/vue@2.6.12/dist/vue.min.js'
  ]
}

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/theme/theme.less')]
    }
  },
  configureWebpack: config => {
    config.entry.app = ['babel-polyfill', 'whatwg-fetch', './src/main.js']
    config.performance = {
      hints: false
    }
  },
  chainWebpack: config => {
    if (isProd) {
      config.plugin('html')
        .tap(args => {
          args[0].cdn = assetsCDN
          return args
        })
    }
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false
}