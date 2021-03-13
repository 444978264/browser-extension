module.exports =
  process.env.BUILD_ANALYZER === 'true'
    ? {
        plugins: [
          new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
            analyzerMode: 'static',
            reportFilename: 'analyzer/index.html',
          }),
        ],
      }
    : {}
