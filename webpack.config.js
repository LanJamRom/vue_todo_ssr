const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const config = {
  target: "web",
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    filename: "bundle.[hash:8]js",
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },

      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: '[name].[ext]',
              outputPath: 'assets/img/'
            }
          }
        ]
      },
    ]
  }
}

if (isDev) {//开发环境
  //开发环境最后push进去
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: "postcss-loader",
        options: { sourceMap: true }
      },
      'stylus-loader'
    ]
  })
  config.plugins = [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HTMLPlugin(),
  ]
  config.devServer = {
    port: '8000',
    overlay: {
      errors: true,
    },
    // open: true
    hot: true //热加载，组件数据更新了只刷新组件，false为刷新页面
  }
} else {//生产环境
  config.entry = {
    app: path.join(__dirname, 'src/main.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    //css预处理器，使用模块化的方式写css代码
    //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
    {
      test: /\.styl/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            publicPath: './',
            hmr: process.env.NODE_ENV === 'development',
          },
        },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: { sourceMap: true }
        },
        'stylus-loader'
      ]
    }
  )
  config.optimization = {
    splitChunks: {
      chunks (chunk) {
        // exclude `my-excluded-chunk`
        return chunk.name !== 'my-excluded-chunk';
      }
    }
  }
  config.plugins = [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HTMLPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'styles.[chunkhash].[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
  ]


}

module.exports = config
