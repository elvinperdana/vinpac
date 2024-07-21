const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
		entry: './src/main.js',
		module: {
				rules: [
						{
								test: /\.vue$/,
								loader: 'vue-loader'
						},
						{
								test: /\.css$/,
								use: [
										'vue-style-loader',
										'css-loader'
								]
						},
						{
								test: /\.scss$/,
								use: [
										'vue-style-loader',
										'css-loader',
										'sass-loader'
								]
						}
				]
		},
		plugins: [
				new VueLoaderPlugin(),
				...(process.env.NODE_ENV === 'production' ? [
						new webpack.DefinePlugin({
								'process.env': {
										NODE_ENV: '"production"'
								}
						}),
						new webpack.optimize.UglifyJsPlugin({
								sourceMap: true,
								compress: {
										warnings: false
								}
						}),
						new webpack.LoaderOptionsPlugin({
								minimize: true
						})
				] : [])
		],
		context: __dirname,
		output: {
				path: path.resolve(__dirname, './dist'),
				filename: 'vinz-package.js'
		}
};

if (process.env.NODE_ENV === 'production') {
		module.exports.devtool = '#source-map';
}
