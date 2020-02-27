const webpack = require('webpack')
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const { UNI_PLATFORM, ZK_DIY } = process.env
var prefixer = require('autoprefixer')
var weexCSS = require('postcss-weex')

module.exports = {
  configureWebpack: {
    devServer: {
      host: '0.0.0.0',
      port: '2000',
      disableHostCheck: true
    },
    resolve: {
      extensions: ['.js', '.vue', '.nvue', '.json'],
      alias: {}
    },
    module: {
      rules: [
  //       {
  //         test: /\.nvue(\?[^?]+)?$/,
  //         loader: `weex-loader`,
  //         options: {
  //           postcss: [weexCSS({ env: 'weex' })]
  //         }
  //       },
		// {
		//   test: /\.vue(\?[^?]+)?$/,
		//   loader: `weex-loader`,
		//   options: {
		//     postcss: [weexCSS({ env: 'weex' })]
		//   }
		// }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          UNI_PLATFORM: JSON.stringify(UNI_PLATFORM),
          ZK_DIY: JSON.stringify(ZK_DIY)
        }
      })
    ]
  },
  chainWebpack(config) {}
}
