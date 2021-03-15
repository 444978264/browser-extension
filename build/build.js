const path = require('path')
const isDev = require('./vars')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./config.base')
const analyzer = require('./analyzer')
const fs = require('fs')
const webpackConfig = mergeConfig()
const compile = webpack(webpackConfig)

if (isDev) {
  compile.watch(
    {
      ignored: ['/node_modules/'],
    },
    taskCallback
  )
} else {
  compile.run(taskCallback)
}

function mergeConfig() {
  const configArgs = [common, analyzer]
  if (!isDev) {
    configArgs.push(require('./config.prod'))
  } else {
    common.entry.reload = path.resolve(__dirname, 'reload.js')
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

  const manifest = require('../public/manifest/base.json')
  const platform = require(`../public/manifest/${process.env.platform}.json`)

  if (isDev) {
    manifest.background.scripts = [
      reWritePath('reload'),
      reWritePath('background'),
    ]
  }

  const writerStream = fs.createWriteStream(
    `${webpackConfig.output.path}/manifest.json`
  )
  // 使用 utf8 编码写入数据
  writerStream.write(JSON.stringify(Object.assign(manifest, platform)), 'UTF8')
  // 标记文件末尾
  writerStream.end()
  // 处理流事件 --> finish、error
  writerStream.on('finish', function () {
    console.log('写入完成。')
  })
  writerStream.on('error', function (err) {
    console.log(err.stack)
  })
}

function reWritePath(fileName) {
  return webpackConfig.output.filename.replace(/\[name\]/, fileName)
}
