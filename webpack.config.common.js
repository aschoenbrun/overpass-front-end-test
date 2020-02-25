const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    styles: "./src/sass/cust.styles.scss",
    html: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/js")
  },
  externals: {
    jquery: "jQuery"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: "../css/[name].bundle.css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: [/(node_modules|bower_components)/, "/src/js/main.jquery.js"],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-syntax-dynamic-import"]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  overrideBrowserslist: ["> 1%", "last 2 versions"] // So Webpack doesnt remove prefixes for the sake of compression
                })
              ],
              sourceMap: true
            }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              sourceMap: true,
              outputStyle: "compressed",
              outFile: "/dist"
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        use: [
          { loader: "file-loader", options: { name: "../[name].[ext]" } },
          { loader: "extract-loader", options: { publicPath: "../" } },
          "html-loader"
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      // enable the js minification plugin
      new UglifyJSPlugin()
    ]
  }
};
