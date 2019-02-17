const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode:'production',
    entry: './app/js/app.js',
    devServer:{
        contentBase: './dist',
        inline:false

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }

}