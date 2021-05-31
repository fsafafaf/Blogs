module.exports = {
  entry: {
    index: "./src/index.js",
    other: "./src/multiply.js",
  },
  output: {
    filename: "[name].[hash:8].js",
  },
  // devtool: "source-map",
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      commons: {
        chunks: "initial",
        minChunks: 2,
        minSize: 2,
      },
      vendor: {
        test: /node_modules/,
        chunks: "initial",
        name: "vendor",
        enforce: true,
      },
    },
  },
};
