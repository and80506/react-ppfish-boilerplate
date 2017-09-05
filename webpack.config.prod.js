import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';
import autoprefixer from 'autoprefixer';
import lessToJs from 'less-vars-to-js';

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/assets/css/lib/ant-theme-vars.less'), 'utf8'));
const extractCss = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  allChunks: true
});
const extractLessLib = new ExtractTextPlugin({
  filename: 'libs.[contenthash].css',
  allChunks: true
});
const extractLessStyle = new ExtractTextPlugin({
  filename: '[name].[hash].css',
  allChunks: true
});

const updateIndexHTML = require('./tools/updateIndexHTML');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

export default {
  devtool: false, // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: {
    index: [
      './src/index',
    ],
    // 库和工具, 公用率 使用频率	更新频率：高 高	低
    libs: [
      'babel-polyfill',
      'moment',
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'react-router-redux',
    ],
    // 定制 UI 库和工具, 公用率 使用频率	更新频率：高 高	中
    vendor: [
      './src/utils/index.js'
    ]
  },
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ],
        debug: false,
        noInfo: true // set to false to see a list of every file being bundled.
      }
    }),
    new webpack.DefinePlugin(GLOBALS), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    extractLessLib,
    extractLessStyle,
    extractCss,
    // for css splitting
    new webpack.optimize.CommonsChunkPlugin({
      // 这个数组的顺序很重要
      names: ['manifest', 'libs', 'vendor'].reverse(),
      minChunks: Infinity
    }),
    new InlineManifestWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: `${__dirname}/dist/index.html`,
      template: `${__dirname}/src/index.html`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // for js splitting
      chunks: ['manifest', 'libs', 'vendor', 'index']
    }),
    new updateIndexHTML()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: path.resolve(__dirname, './src/vendor'),
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [{
          loader: 'url-loader?limit=100000'
        }]
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
        }]
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
        }]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.ico$/,
        use: [{
          loader: 'file-loader?name=[name].[ext]'
        }]
      },
      // for css lib splitting
      {
        test: /(\.css|\.less)$/,
        include: path.resolve(__dirname, './src/assets/css/lib'),
        use: extractLessLib.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'less-loader',
            options: {
              minimize: true,
              modifyVars: themeVariables
            }
          }],
          fallback: 'style-loader'
        })
      },
      // for css page splitting
      {
        test: /(\.css|\.less)$/,
        exclude: path.resolve(__dirname, './src/assets/css/lib'),
        use: extractLessStyle.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'less-loader',
            options: {
              minimize: true
            }
          }],
          fallback: 'style-loader'
        })
      }
    ]
  }
};
