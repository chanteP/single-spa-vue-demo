const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const env = process.env.NODE_ENV || 'development';
const projectConfig = require('../project.config');
const baseDir = path.resolve(__dirname, '../');
const relStaticDirName = 'static';
const relStaticRoot = path.resolve(projectConfig.path, `/${relStaticDirName}`);

module.exports = {
  mode: env,
  watch: env === 'development',
  entry: {
    // Set the single-spa config as the project entry point
    [projectConfig.projectName]: [path.resolve(baseDir, projectConfig.entry)],
  },
  output: {
    publicPath: `${relStaticRoot}/${projectConfig.projectName}/`,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../', projectConfig.staticPath),
    library: projectConfig.projectName,
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        // Webpack style loader added so we can use materialize
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
          test: /\.s(c|a)ss$/,
          use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, '../node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        // This plugin will allow us to use html templates when we get to the angularJS app 
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: `${relStaticDirName}/image/[name].[ext]`
            }
          }
        ]
      }
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [
      baseDir,
      'node_modules',
    ],
  },
  plugins: [
    // A webpack plugin to remove/clean the build folder(s) before building
    new AssetsPlugin({filename: `${projectConfig.staticPath}/assets.json`}),
    new VueLoaderPlugin()
  ],
  devtool: env === 'production' ? 'source-map' : 'eval',
  externals: [],
};
