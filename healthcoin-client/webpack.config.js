let config = require('./webpack.config.base')
const isProduction = process.env.NODE_ENV === 'production'
const devtool = isProduction ? false : 'cheap-module-source-map'
const plugins = isProduction ? require('./webpack.plugins.prod') : require('./webpack.plugins.dev')

Object.assign(config, {
  devtool,
  plugins
})

module.exports = config
