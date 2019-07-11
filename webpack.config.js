const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = env => {
  const envMode = env.NODE_ENV || 'development';
  const isDevEnv = envMode === 'development';
  
  // mode
  const mode = 'development';
  
  // plugins
  const devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
  ];
  
  const prodPlugins = [];
  
  const commonPlugins = [];
  
  const plugins = isDevEnv
    ? devPlugins.concat(commonPlugins)
    : prodPlugins.concat(commonPlugins);
  
  const entry = isDevEnv ? [
    'webpack/hot/poll?1000',
    `./src/index.ts`
  ]: `./src/index.ts`;


  const nodeExternalsWhitelist = isDevEnv ? [ 'webpack/hot/poll?1000' ] : [];

  return {
    entry,
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js'
    },
    plugins: plugins,
    target: 'node',
    mode,
    externals: [
      nodeExternals({
        whitelist: nodeExternalsWhitelist,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader'],
          exclude: /node_modules/
        },
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          loader: 'tslint-loader',
          options: {
            configFile: './tslint.json'
          },
          exclude: /node_modules/,
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    }
  };
};
