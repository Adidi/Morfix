const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const commonConfig = require('./webpack.common.config');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = webpackMerge(commonConfig(true), {
    optimization: {
        minimizer: [new TerserPlugin()],
      },
    plugins: [

        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),

        new ProgressBarPlugin()
    ]
});