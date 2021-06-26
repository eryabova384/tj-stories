const path = require("path");
const { merge } = require("webpack-merge"); //подключаем webpack-merge
const common = require("../webpack.config.js"); //подключаем общий файл из корня проекта
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //подключаем модули для минификации

module.exports = merge(common, {
	mode: "production",
	plugins: [new MiniCssExtractPlugin()],
	module: {
		rules: [
			// CSS, PostCSS, Sass с минификацией для prod
			{
				test: /\.(scss|css)$/, //смотрим на файлы scss и css
				use: [
					MiniCssExtractPlugin.loader,
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
	optimization: {
		minimizer: [new CssMinimizerPlugin()],
	},
});
