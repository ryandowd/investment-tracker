const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
 
module.exports = {
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, './.env')
        }),
        // new webpack.ProvidePlugin({
        //     fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
        // })
    ],
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
    },
};

