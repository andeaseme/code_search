const path = require('path');
const webpack = require('webpack');

const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    return {
        context: sourcePath,
        entry: {
            main: './index.tsx',
        },
        output: {
            path: outPath,
            publicPath: '/',
            filename: 'bundle.js',
        },
        target: 'web',
        resolve: {
            modules: [sourcePath, 'node_modules'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        module: {
            loaders: [{
                test: /\.tsx?$/,
                loaders: ['awesome-typescript-loader'],
            }, {
                test: /\.wasm$/,
                loaders: ['wasm-loader'],
            }, {
                test: /\.s?css$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            }, {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
            }, {
                test: /\.(jpg|png|gif|svg)$/,
                loaders: [
                    'file-loader', {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
                            },
                        },
                    },
                ],
            }, {
                test: /\.html$/,
                loader: 'html-loader',
            }, {
                test: /\.json$/,
                loader: 'json-loader',
            }, {
                test: /\.(mp4|webm)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                },
            }],
        },

        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                template: 'index.html',
            }),
        ],

        devServer: {
            contentBase: sourcePath,
            historyApiFallback: {
                index: '/',
            },
            hot: true,
            disableHostCheck: true,
            stats: {
                warnings: false,
            },
            publicPath: '/',
        },
    };
};
