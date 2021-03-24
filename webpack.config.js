const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'none',
	entry: {
		app: path.resolve(__dirname, './src/js/main.js')
	},
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'script.js'
	},
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [ "style-loader", "css-loader", "postcss-loader", "sass-loader"],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname, './build'),
		open: true,
		hot: true,
		port: 3000,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html')
		})
	]
}