const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(prod) {

    return {
        mode: prod ? 'production' : 'development',
        entry: {
            popup: ['@babel/polyfill', path.resolve(__dirname, '../src/js/popup')],
            settings: ['@babel/polyfill', path.resolve(__dirname, '../src/js/settings')],
            balloon: ['@babel/polyfill', path.resolve(__dirname, '../src/js/balloon')],
            background: ['@babel/polyfill', path.resolve(__dirname, '../src/js/background')]
        },

        output: {
            path: path.resolve(__dirname, '../src/dist'),
            filename: '[name].js'
        },

        module: {
            rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory:true
                },
                include: path.resolve(__dirname, '../src/js/')
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader , {
                                    loader: 'css-loader',
                                    options: {
                                        sourceMap: !prod
                                    }
                                },
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        sourceMap: !prod
                                    }
                                }
                            ],
                include: path.join(__dirname, '../src/scss')
            },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000'
                }
            ]
        },

        resolve: {
            extensions: ['.js', '.jsx']
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "common",
                        chunks: "all"
                    }
                }
            }
        },

        plugins: [

            new CleanWebpackPlugin(),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development')
            }),

            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ]
    }
};