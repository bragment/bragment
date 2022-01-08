const CracoAntDesignPlugin = require('craco-antd');
const { DefinePlugin } = require('webpack');
const packageData = require('./package.json');
require('dotenv').config();

const environmentVariablesWebpackPlugin = new DefinePlugin({
  'process.env.REACT_APP_NAME': JSON.stringify(packageData.name),
  'process.env.REACT_APP_VERSION': JSON.stringify(packageData.version),
  'process.env.APP_VERSION': JSON.stringify(packageData.version),
  'process.env.APP_ID': JSON.stringify(process.env.APP_ID),
  'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL),
  'process.env.GRAPHQL_URL': JSON.stringify(process.env.GRAPHQL_URL),
  'process.env.UNSPLASH_ACCESS_KEY': JSON.stringify(
    process.env.UNSPLASH_ACCESS_KEY
  ),
});

module.exports = {
  webpack: {
    plugins: [environmentVariablesWebpackPlugin],
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#0396ff',
          // '@border-radius-base': '6px',
        },
      },
    },
  ],
};
