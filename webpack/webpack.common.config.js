const path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(prod) {

    return {
        entry: {
            popup: ['babel-polyfill', path.resolve(__dirname, '../src/js/popup')],
            settings: ['babel-polyfill', path.resolve(__dirname, '../src/js/settings')],
            balloon: ['babel-polyfill', path.resolve(__dirname, '../src/js/balloon')],
            background: ['babel-polyfill', path.resolve(__dirname, '../src/js/background')]
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
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
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
                        ]
                    }),
                    include: path.resolve(__dirname, '../src/scss')
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

        plugins: [
            new ExtractTextPlugin({
                filename: '[name].css',
                allChunks: true
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                minChunks: 2
            }),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development')
            })
        ]
    }
};