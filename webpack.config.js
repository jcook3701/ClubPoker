const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    popup: "./src/components/popup/index.tsx",
    background: "./src/background/background.ts",
    content: "./src/content/content.ts",
  },
  mode: "production",
  module: {
    rules: [
      {
        // TypeScript
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        // CSS
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        // SCSS Modules
        test: /\.module\.scss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files for production
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: false, // Explicitly disable named exports
                localIdentName: "[name]__[local]--[hash:base64:5]", // Customizes generated class names
              },
              sourceMap: true, // Enables source maps for debugging
              importLoaders: 2, // Number of loaders applied before css-loader
              esModule: true,
            },
          },
          "sass-loader", // Compiles SCSS to CSS
        ],
      },
      {
        // Global SCSS
        test: /\.scss$/i, // Match SCSS files
        exclude: [/node_modules/, /\.module\.scss$/i], // Exclude .module.scss files from this rule
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files for production
          "css-loader", // Resolve CSS imports
          "sass-loader", // Compile SCSS into CSS
        ],
      },
      {
        // Images
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", // built-in in Webpack 5 (replaces file-loader/url-loader)
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "../manifest.json" },
        { from: "src/icons", to: "../icons" },
      ],
    }),
    ...getHtmlPlugins(["popup"]),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: "React extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
