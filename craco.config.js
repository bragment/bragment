const CracoAntDesignPlugin = require('craco-antd');

const webpackConfig = {};
const pluginList = [];

if (process.env.NODE_ENV !== 'test') {
  pluginList.push({
    plugin: CracoAntDesignPlugin,
  });
}

module.exports = {
  webpack: webpackConfig,
  plugins: pluginList,
};
