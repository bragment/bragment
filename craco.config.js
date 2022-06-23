const CracoAntDesignPlugin = require('craco-antd');
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
});

const webpackConfig = { plugins: [environmentVariablesWebpackPlugin] };
const pluginList = [];

if (process.env.NODE_ENV !== 'test') {
  pluginList.push({
    plugin: CracoAntDesignPlugin,
    options: {
      customizeTheme: {
        '@border-radius-base': '6px',
      },
    },
  });
}

module.exports = {
  webpack: webpackConfig,
  plugins: pluginList,
};
