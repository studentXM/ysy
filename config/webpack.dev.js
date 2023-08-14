const webpack = require("webpack");
const isProduction = false;
const dev = (arg) => {
  return {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      hot: true,
    },
  };
};
module.exports = dev();
