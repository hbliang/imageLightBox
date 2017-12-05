const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'imageLightBox.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'imageLightBox',
        libraryTarget: 'umd'
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('imageLightBox.css'),
        new es3ifyPlugin()
        // new UglifyJSPlugin({
        //     exclude: /(node_modules|bower_components)/,
        //     sourceMap: true
        // })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader'],
                })
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015'],
                        plugins: ['transform-runtime']
                    }
                }
            }, {
                test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
                loader: 'file-loader'
            }
        ]
    }
}