import * as path from 'path';
import nodeExternals from 'webpack-node-externals'

module.exports = {
    entry: './src/server.ts',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './dist'),
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    target: 'node',
    externals: [nodeExternals()],
};
