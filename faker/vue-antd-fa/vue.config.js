const path = require('path')
const webpack = require('webpack')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const { getThemeColors, modifyVars } = require('./src/utils/themeUtil')
const { resolveCss } = require('./src/utils/theme-color-replacer-extend')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']
const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    nprogress: "NProgress",
    clipboard: 'ClipboardJS',
    '@antv/data-set': 'DataSet',
    'js-cookie': 'Cookies'
  },
  css: [],
  js: [
    '//cdn.jsdeliver.net/npm/vue@2.6.12/dist/vue.min.js',
    '//cdn.jsdeliver.net/npm/vue-router@3.3.4/dist/vue-router.min.js',
    '//cdn.jsdeliver.net/npm/vuex@3.4.0/dist/vuex.min.js',
    '//cdn.jsdeliver.net/npm/axios@0.19.2/dist/axios.min.js',
    '//cdn.jsdeliver.net/npm/nprogress@0.2.0/nprogress.min.js',
    '//cdn.jsdeliver.net/npm/clipboard@2.0.6/dist/clipboard.min.js',
    '//cdn.jsdeliver.net/npm/@antv/data-set@0.11.4/build/data-set.min.js',
    '//cdn.jsdeliver.net/npm/js-cookie@2.2.1/sr/js.cookie.min.js'
  ]
}

module.exports = {
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: process.env.VUE_APP_API_BASE_URL,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
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
    // 主题颜色替换插件
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss
      })
    )
    // 忽略moment.js的所有本地文件
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    // 生产环境下开启gzip压缩
    if (isProd) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }

    // 生产环境下使用cdn资源
    if (isProd) {
      config.externals = assetsCDN.externals
    }
  },
  chainWebpack: config => {
    // 生产环境关闭css压缩的 colormin 项，该项与主题色替换功能冲突
    if (isProd) {
      config.plugin('optimize-css')
        .tap(args => {
          args[0].cssnanoOptions.preset[1].colormin = false
          return args
        })
    }

    // 生产环境下使用CDN
    if (isProd) {
      config.plugin('html')
        .tap(args => {
          args[0].cdn = assetsCDN
          return args
        })
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false
}