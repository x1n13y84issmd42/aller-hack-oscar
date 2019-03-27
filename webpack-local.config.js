const Dotenv = require('dotenv-webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['./src/front/utils/polyfills.ts', './src/front/App.tsx', './src/front/styles/index.scss'],
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/out/dist',
        publicPath: '/',
    },
    mode: 'development',
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    target: 'web',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        modules: [path.resolve('./src/'), path.resolve('./node_modules'), 'node_modules'],
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
            },

            {
                test: /\.(jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            },

            {
                test: /\.html/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },

            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|ico)$/,
                loader: 'file-loader?name=[name].[ext]',
            },
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
                        }

					},
				]
			},
			{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                exclude: [/node_modules\/react-paginate/],
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },

    plugins: [
        new ExtractTextPlugin('style.css'),
        new CopyWebpackPlugin([{ from: './assets', to: 'assets' }]),
        new Dotenv(),

        // analyze webpack chunks
        // new BundleAnalyzerPlugin()
    ],
    // Other options...
};
