module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
    // common: "./src/common.js",
    other: "./src/multiply.js"
  },
  output: {
    filename: "[name].js"
  },
  // devtool: "source-map"
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true
        }
      }
    }
  }
}

// 1.entry index
// 2.entry other
// 3.runtimeChunks: "single"
// 4.splitChunks common
// 5.splitChunks vendor