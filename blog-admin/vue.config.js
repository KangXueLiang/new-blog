/**
 * @describe vue-cli 3.x配置文件
 */
const path = require('path')
// 导入gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 是否开启gzip
const productionGzip = true
// 定义需要gzip压缩的文件类型
const productionGzipExtensions = ['js', 'css']

function resolve(dir) {
  return path.join(__dirname, './', dir)
}
// 去console插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 是否开启productionSourceMap,有了map就可以像未加密的代码一样,准确的输出是哪一行哪一列有错
const SourceMapStatus = false

module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: SourceMapStatus,
  devServer: {
    open: true, // 自动打开浏览器
    host: '0.0.0.0', // 代理地址
    port: 3005, // 代理端口
    https: false // 是否开启https
    // proxy: {
    //   // 凡是 `/api` 开头的 http/https 请求，都会被代理到 x.x.x.x:port 上
    //   '/api': {
    //     target: 'http://0.0.0.0:3001',
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  // 链式配置
  chainWebpack: (config) => {
    config
      .entry('app')
      .add('babel-polyfill')
      .end
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV === 'production',
        config => {
          config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // 只打包初始时依赖的第三方
              },
              elementUI: {
                name: 'chunk-elementUI', // 单独将 elementUI 拆包
                priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                test: /[\\/]node_modules[\\/]element-ui[\\/]/
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // 可自定义拓展你的规则
                minChunks: 3, // 最小公用次数
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
          config.optimization.runtimeChunk('single')
        }
      )
    // 可视化构建的文件, 清楚看到各个模块的组成部分,便于分析和优化打包的代码,撸起来才更嗨
    // https://github.com/webpack-contrib/webpack-bundle-analyzer
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  // 基础配置
  configureWebpack: config => {
    const plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        },
        sourceMap: SourceMapStatus, // 使用这个属性要和上面productionSourceMap属性值匹配要么都为false要么都为true,不一致那就是自己找死
        parallel: require('os').cpus().length > 1 // 看文档,该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
      })
    ]
    console.log('=======vue.config.js====process.env.NODE_ENV===>', process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      // 合并去console
      config.plugins = [...config.plugins, ...plugins]
      // 构建时开启gzip,降低服务器压缩对CPU资源的占用,服务器也要相应开启gzip
      productionGzip && config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    } else {
      // 开发环境
    }
  }
}
console.log('====vue.config.js打包多环境====>', process.env.NODE_ENV)
