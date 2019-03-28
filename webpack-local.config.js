const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Load environment vars from .env
require('dotenv').config();

const isProduction = process.env.ENV === 'production';

// Loaders

const BabelLoader = {
    loader: 'babel-loader',
    options: {
        presets: ['es2015', 'react'],
        // plugins: [ 'lodash' ],
    },
};

const TypeScriptLoader = {
    loader: 'awesome-typescript-loader?silent=true',
    options: {
        configFileName: __dirname + '/tsconfig.json',
    },
};

// Plugins
const TypeScriptPathsPlugin = new TsconfigPathsPlugin({
    configFile: "./tsconfig.json",
    logLevel: "info",
    extensions: [".ts", ".tsx"],
    mainFields: ["browser", "main"],
    // baseUrl: "/foo"
})

const OrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();

const ExtractSassPlugin = new ExtractTextPlugin({
    filename: 'style.css',
});

// Main config, see other (sometimes environment depending) settings below

const webpackConfig = {
    entry: {
        'app': [
            'babel-polyfill',
            __dirname + '/src/front/App.tsx',
        ]
    },
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'out/dist', 'bundle'),
        publicPath: '/',
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json',
        ],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules',
        ],
        plugins: [
            TypeScriptPathsPlugin
        ]
    },

    module: {
        rules: [{
                test: /\.tsx?$/,
                // Mind that these loaders get executed in right-to-left order:
                use: [
                    BabelLoader,
                    TypeScriptLoader,
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ExtractSassPlugin.extract({
                    use: [{
                        loader: 'css-loader?-url',
                        options: {
                            minimize: true
                        },
                    }, {
                        loader: 'sass-loader',
                    }],
                    // use style-loader in development
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [
        OrderPlugin,
        ExtractSassPlugin,
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },

    node: {
        fs: 'empty',
        child_process: 'empty',
        dgram: 'empty',
        dns: 'empty',
        net: 'empty',
        cluster: 'empty',
        repl: 'empty'
    }
};

// Enable source maps in development

if (!isProduction) {
    webpackConfig.devtool = 'source-map';
}

// Production Plugins

if (isProduction) {
    console.log('Production build');
    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    );
}

// All good

module.exports = webpackConfig;