const webpackMerge = require('webpack-merge'),
    commonConfig = require('./webpack.common.config');

module.exports = webpackMerge(commonConfig(false), {
    cache: true,
    devtool: 'eval'
});
