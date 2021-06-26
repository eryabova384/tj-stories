const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge"); //подключаем webpack-merge
const common = require("../webpack.config.js"); //подключаем общий файл из корня проекта

module.exports = merge(common, {
	mode: "development",
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, "./dist"),
		open: true, //автоматическое открытие
		compress: true,
		hot: true,
		port: 3000,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	module: {
		rules: [
			// CSS, PostCSS, Sass без минификации
			{
				test: /\.(scss|css)$/, //смотрим на файлы scss и css
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"sass-loader",
					{
						loader: "sass-resources-loader",
						options: {
							resources: "./src/styles/vars.scss",
						},
					},
				], //перечисляем загрузчики справа налево
			},
			{
				test: /\.(jpg|svg|ttf|woff)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path][name].[ext]",
							outputPath: "/images/",
						},
					},
				],
			},
		],
	},
});
