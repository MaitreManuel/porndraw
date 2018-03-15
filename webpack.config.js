const path = require('path');
const webpack = require('webpack');
// const WebpackMonitor = require('webpack-monitor');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeModules = path.resolve(__dirname, 'node_modules');

const resources = path.resolve(__dirname, 'src/SiteBundle/Resources');

const config = {
  cache: true,
  entry: {
    app: [
      './src/script/client/app.js',
    ]
  },
  output: {
    library: '[name]', // assets build
    libraryTarget: 'umd',
    path: path.join(__dirname, 'web/compiled'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  module: {
    rules: [{
      // required for es6
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }, {
      // required to write 'require('./style.scss')'
      test: /\.s(a|c)ss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(resources , '/assets/'),
                nodeModules
              ],
              sourceMap: true
            }
          },
        ]
      })
    }, {
      // required to write 'require('./style.css')'
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
        ]
      })
    }, {
      // required for bootstrap icons
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      options: {
        prefix: 'font/',
        limit: 5000,
        mimetype: 'application/font-woff'
      }
    }, {
      test: /\.(ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        prefix: 'font/'
      }
    }, {
      // required to support images
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: '[hash].[ext]'
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            includePaths: [
              path.resolve(resources , '/public/')
            ],
            gifsicle: {
              interlaced: false
            },
            bypassOnDebug: true,
            optipng: {
              optimizationLevel: 7
            }
          }
        }
      ]
    }]
  },
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'source-map',
  plugins: [
    // new WebpackMonitor({ launch: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.devtool= false;
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8,
        warnings: false,
        compress: {
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          drop_console: true,
          drop_debugger: true,
        },
        output: {
          comments: false,
          beautify: false,
        },
        sourceMap: false,
        pure_funcs: ['console.log'],
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      },
    }),
    // optimize module ids by occurrence count
    new webpack.optimize.OccurrenceOrderPlugin()
  );
} else {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  );
}

module.exports = config;
