var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader', 'css-loader', 'sass-loader']
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
})
var cssConfig = isProduction ? cssProd : cssDev;
const fontsPath = 'file-loader?name=/assets/fonts/[name].[ext]';
const urlLoader = [{
    loader: 'url-loader?name=/assets/imgs/[name].[ext]',
    options: {
        limit: 1024,
    }
}];

module.exports = {
    entry: {
        app: './src/js/app.js',
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: cssConfig,
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
                use: fontsPath,
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|jpeg|gif|png|ico)$/i,
                use: urlLoader,
                exclude: /node_modules/
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist/'),
        compress: true,
        hot: true,
        open: true,
        stats: 'errors-only'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Infinity',
            filename: 'index.html',
            template: './src/index.pug',
            chunks: ['app'],
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Infinity - Cotizar',
            filename: 'quote.html',
            template: './src/pug/quote.pug',
            chunks: ['app'],
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Infinity - IE-House',
            filename: 'ie-house.html',
            template: './src/pug/ie-house.pug',
            chunks: ['app'],
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Infinity - COOP',
            filename: 'coop.html',
            template: './src/pug/coop.pug',
            chunks: ['app'],
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Infinity - Bar',
            filename: 'bar.html',
            template: './src/pug/bar.pug',
            chunks: ['app'],
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Infinity - About us',
            filename: 'about-us.html',
            template: './src/pug/about-us.pug',
            chunks: ['app'],
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/app.css',
            disable: !isProduction,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}