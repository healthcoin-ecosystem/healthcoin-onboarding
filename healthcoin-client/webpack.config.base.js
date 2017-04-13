const path = require('path');

console.log(`Compiling to ${path.join(__dirname, 'dist')} ...`)

module.exports = {
  context: path.join(__dirname, 'src'), // `__dirname` is root of project and `src` is source
  entry: {
    vendor: ['moment'],
    app: './js/index.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  module: require('./webpack.module.js')
}
