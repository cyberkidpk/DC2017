const stylelint = require('stylelint')
const cssLintRules = require('./csslint.json')
const path = require('path')

module.exports = function(entries, output, includes) {
  const babelLoaderConfig = {
    test: /\.js$/,                                        //changed to access .js extension
    loader: 'babel',                     //modified for latest specification
    query: {
      presets: ['babel-preset-es2015', "babel-preset-stage-1"].map(require.resolve),
      cacheDirectory: true
    },
    include: includes
  }


  return {
   // babelLoader: babelLoaderConfig,
    entry: entries,
    resolveLoader: {
      root: path.join(__dirname, "..", "node_modules"),
      fallback: path.join(__dirname, "..")
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: {
      path: output,
      publicPath: '/',
      filename: 'bundle123.js'
    },
     module: {
      preLoaders: [
        {
          test: /\.css$/,
          loaders: ['postcss']
        }
      ],
      loaders: [
        {
          test: /package\.json$/,
          loader: 'PackageJson'
        },
        {
          test: /\.less$/,
          loader: 'style-loader!css-loader!less-loader'
        },
        {
          test: /\.css$/,
          loaders: ['style', 'css']
        },
        { test: /\.(png|jpg|jpeg)$/, loader: 'url-loader?limit=8192' },
        { test: /\.js$/,
           loader: 'babel-loader',
      exclude: /node_modules/
           },
           babelLoaderConfig,
        {
          test: /\.(gif|svg|woff|woff2|ttf|eot|html)$/,
          loader: 'file'
        }
      ]
    },
    postcss: function() {
      return [stylelint({
        rules: cssLintRules
      })];
    }
  }
}