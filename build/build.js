const isDev = require('./vars')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./config.base')
const analyzer = require('./analyzer')

const compile = webpack(mergeConfig())

if (isDev) {
  compile.watch(
    {
      ignored: ['/node_modules/'],
    },
    taskCallback
  )
  // .close(() => {
  //   console.log('Watching Ended.')
  // })
} else {
  compile.run(taskCallback)
}

function mergeConfig() {
  const configArgs = [common, analyzer]
  if (!isDev) {
    configArgs.push(require('./config.prod'))
  }
  return merge.apply(null, configArgs)
}

function taskCallback(err, stats) {
  if (err) {
    console.error(err)
    return
  }
  console.log(
    stats.toString({
      chunks: false,
      colors: true,
    })
  )
}
