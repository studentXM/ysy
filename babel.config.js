module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // false 不使用
        // usage 代码中需要的polyfill 就引入相关api
        // entry 浏览器需要的polyfill
        useBuiltIns: "usage",
        corejs: 3, //如果不写 默认就使用2 的版本
      },
    ],
    ["@babel/preset-typescript"],
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        throwIfNamespace: false, // defaults to true
        runtime: "automatic", // defaults to classic
      },
    ],
  ],
};
