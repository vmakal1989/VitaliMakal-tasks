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
					},
					{
						test: /\.svg$/,
						use: [
							{
								loader: 'svg-url-loader',
								options: {
									limit: 10000,
								},
							},
						],
					},
					{
						test: /\.(png|jpe?g|gif)$/i,
						use: [
							{
								loader: 'file-loader',
								options: {
									name: 'src/assets/images/[name].[ext]',
								},
							},
						],
					},
					{
						test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
						use: [
							{
								loader: 'file-loader',
								options: {
									name: 'src/style/fonts/[name].[ext]'
								}
							}
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
		}),
		new webpack.DefinePlugin({
			'process.env.PUBLIC_URL': JSON.stringify('')
		})
	],

	devServer: {
		historyApiFallback: true,
		contentBase: resolve('./build'),
		hot: true,
		open: true,
	}
}

export default config