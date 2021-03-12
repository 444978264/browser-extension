const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
})

const isDev = process.env.NODE_ENV !== 'production'

const Plugins = []

module.exports = (config) => {
  if (config.analyzer) {
    Plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'analyzer/index.html',
      })
    )
  }

  return {
    mode: process.env.NODE_ENV,
    watch: isDev,
    watchOptions: {
      ignored: ['/node_modules/'],
    },
    entry: {
      popup: './src/index.js',
      content: './src/content.js',
      background: './src/background.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'scripts/[name].bundle.js',
      assetModuleFilename: 'images/[hash][ext][query]',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    optimization: {
      // minimize: true,
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
          type: 'asset/source',
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
        },
      ],
    },
    plugins: [
      ...Plugins,
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist/**/*')],
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new MiniCssExtractPlugin({
        filename: 'style/[name].css',
      }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['popup'],
        filename: 'popup.html',
        template: './src/popup.html',
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: './package.json' }],
      }),
    ],
  }
}
