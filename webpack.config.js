const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: {
		//точка входа
		main: path.resolve(__dirname, "./src/scripts/index.js"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Webpack test",
			template: path.resolve(__dirname, "./src/template.html"), //шаблон
			filename: "index.html", //выходной файл
		}),
		new CleanWebpackPlugin(), //очистка папки /dist
	],
	module: {
		rules: [
			{
				test: "/.js$/", //смотрим на js* файлы
				exclude: /node_modules/, //исключая папку node_modules
				use: ["babel-loader"], //используем загрузчик babel
			},
		],
	},
	output: {
		//точка выхода
		path: path.resolve(__dirname, "./dist"),
		filename: "./scripts/[name].bundle.js",
	},
};
