var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config');

// Make webpace-dev-server respect react-router mounting points
// @see http://stackoverflow.com/questions/26203725/how-to-allow-for-webpack-dev-server-to-allow-entry-points-from-react-router
new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, 'src'),
  port: 8008,
  hot: true,
  // compress: true,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  headers: {
    //"Cache-Control": "public, max-age=315360000"
    "Cache-Control": "no-store"
  }
}).listen(3000, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at http://0.0.0.0:3000');
});
