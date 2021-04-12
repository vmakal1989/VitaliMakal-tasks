import webpack from 'webpack'
import path from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'

type envType = 'development' | 'production'

const resolve = (...args: string[]) => path.resolve(process.cwd(), ...args)

const mode = (process.env.NODE_ENV || 'development') as envType

const config: webpack.Configuration = {
	mode,
	context: resolve('./src'),
	entry: {
		app: [
			'react-hot-loader/patch',
			'./index.tsx',
		],
	},
	output: {
		path: resolve('./build'),
		filename: '[name].[hash].js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
		modules: ['node_modules', resolve('./')],
		alias: {
			'react-dom': '@hot-loader/react-dom',
			'@': resolve('./src')
		}
	},
	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.[tj]s(x)?$/,
						use: ['babel-loader'],
					},
					{
						test: /\.s[ac]ss$/,
						use: [
							'style-loader',
							'css-loader',
							'sass-loader',
						]
					}
				]
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: resolve('./public/index.html'),
			inject: 'body',
			scriptLoading: 'blocking',
		})
	],
	devServer: {
		contentBase: resolve('./build'),
		hot: true,
		open: true,
	}
}

export default config