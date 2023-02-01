/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const ESLintPlugin = require("eslint-webpack-plugin");

const {
	NODE_ENV = "production"
} = process.env;

module.exports = {
	entry: path.resolve(__dirname, "..", "./src/server.ts"),
	mode: NODE_ENV,
	target: "node",
	output: {
		path: path.resolve(__dirname, "../build"),
		filename: "app.js"
	},
	resolve: {
		extensions: [ ".ts", ".js" ],
		plugins: [
			new TsconfigPathsPlugin()
		]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					"ts-loader"
				]
			}
		]
	},
	externals: [ nodeExternals() ],
	plugins: [
		new ESLintPlugin(),
	],
	stats: "errors-only"
}
