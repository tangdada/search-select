'use strict'
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'searchSelect.js'
    },
    module: {
        loaders: [
        // { test: /\.js?$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        { test: /\.css$/, loader: "style!css" },
        { test: /\.less/,loader: 'style-loader!css-loader!less-loader'}
        ]
    },
    resolve:{
        extensions:['.js','.json']
    },
    externals: {
       "jquery": "jQuery"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
