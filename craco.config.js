const { DefinePlugin } = require('webpack');
const packageData = require('./package.json');
require('dotenv').config();

// NOTE: for react app
process.env.REACT_APP_NAME = packageData.name;
process.env.REACT_APP_VERSION = packageData.version;

const environmentVariablesWebpackPlugin = new DefinePlugin({
  'process.env.APP_ID': JSON.stringify(packageData.name),
  'process.env.APP_VERSION': JSON.stringify(packageData.version),
  'process.env.MAIN_SERVER_URL': JSON.stringify(process.env.MAIN_SERVER_URL),
  'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
  'process.env.UNSPLASH_ACCESS_KEY': JSON.stringify(
    process.env.UNSPLASH_ACCESS_KEY
  ),
});

const webpackConfig = { plugins: [environmentVariablesWebpackPlugin] };
const pluginList = [];

module.exports = {
  webpack: webpackConfig,
  plugins: pluginList,
};
