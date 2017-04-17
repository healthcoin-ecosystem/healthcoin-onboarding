const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  rules: [
    {
      test: /\.js$/, // Check for all js files
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015', 'react', 'stage-0'] }
      }]
    },
    {
      test: /\.less$/,
      use: ["style-loader", "css-loader", "less-loader"]
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: true,
            camelCase: 'dashes',
            localIdentName: '[name]--[local]-[hash:base64:5]'
          }
        }
      })
    },
    {
      test: /\.(png|ttf|eot|svg|woff(2)?)(.*)$/,
      use: 'file-loader'
    },
    {
      test: /\.json$/,
      use: 'json-loader'
    }
  ]
};
