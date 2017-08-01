const webpack = require('webpack'),
    webpackMerge = require('webpack-merge'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin'),
    commonConfig = require('./webpack.common.config'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = webpackMerge(commonConfig(true), {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true
            },
            compress: {
                screw_ie8: true,
                warnings: false
            },
            sourceMap: false,
            comments: false
        }),

        new OptimizeCssAssetsPlugin(),

        new ProgressBarPlugin()
    ]
});
