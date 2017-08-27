const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../client/client.jsx'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../assets/scripts'),
    filename: 'scripts/[name].js',
    chunkFilename: '[name]_[chunkhash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]', 'sass-loader']
        })
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=images/[name].[hash:8].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', 'jpg', 'jpeg', 'png', 'gif', 'svg']
  },
  devtool: 'hidden-source-map',
  plugins: [
    new ExtractTextPlugin({ filename: 'styles/[name].css', disable: false, allChunks: true }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./reactFest.json')
    }),
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      }
    }),
  ]
};
