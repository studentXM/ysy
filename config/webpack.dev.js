const webpack = require("webpack");
const isProduction = false;
const dev = (arg) => {
  return {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      hot: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        }
      }
    }
  };
}
module.exports = dev();
