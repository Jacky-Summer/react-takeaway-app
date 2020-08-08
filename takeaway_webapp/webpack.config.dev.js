const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const srcRoot = path.resolve(__dirname, 'src')
const devPath = path.resolve(__dirname, 'dev')
const pageDir = path.resolve(srcRoot, 'pages')
const mainFile = 'index.js'

function getHtmlArray(entryMap) {
  let htmlArray = []
  Object.keys(entryMap).forEach(key => {
    let fullPathName = path.resolve(pageDir, key)
    let fileName = path.resolve(fullPathName, `${key}.html`)
    if (fs.existsSync(fileName)) {
      htmlArray.push(
        new HtmlWebpackPlugin({
          filename: `${key}.html`,
          template: fileName,
          chunks: ['common', key],
        })
      )
    }
  })
  return htmlArray
}

function getEntry() {
  let entryMap = {}

  fs.readdirSync(pageDir).forEach(pathname => {
    let fullPathName = path.resolve(pageDir, pathname)
    // stat 类：获取文件信息
    let stat = fs.statSync(fullPathName) // 同步 stat(). 返回 fs.Stats 的实例。
    let fileName = path.resolve(fullPathName, mainFile)
    if (stat.isDirectory() && fs.existsSync(fileName)) {
      // 有目录且有index.js文件，代表是入口文件
      entryMap[pathname] = fileName
    }
  })
  return entryMap
}

const entryMap = getEntry()
const htmlArray = getHtmlArray(entryMap)

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: devPath,
    hot: true,
  },
  entry: entryMap,
  output: {
    path: devPath,
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: srcRoot,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    regenerator: true,
                  },
                ],
              ],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: srcRoot,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: srcRoot + '/component/common.scss',
            },
          },
        ],
        include: srcRoot,
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: 'url-loader?limit=8192',
        include: srcRoot,
      },
    ],
  },
  resolve: {
    alias: {
      component: path.resolve(srcRoot, 'component'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()].concat(htmlArray),
}
