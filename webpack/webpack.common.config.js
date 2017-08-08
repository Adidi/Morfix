const path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(prod) {

    return {
        entry: [
            'babel-polyfill', // for async-await support!
            path.resolve(__dirname, '../src/js/popup')
        ],

        output: {
            path: path.resolve(__dirname, '../src/dist'),
            filename: 'app.js'
        },

        module: {
            rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory:true
                },
                include: path.resolve(__dirname, '../src/js/popup')
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
                filename: 'app.css'
            }),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development')
            })
        ]
    }
};