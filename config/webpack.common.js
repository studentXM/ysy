const path = require("path");
const os = require("os");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// devserver中终端内容显示
const {FriendlyErrorsWebpackPlugin } = require("@modern-js/friendly-errors-webpack-plugin");

// eslint
const ESLintPlugin = require('eslint-webpack-plugin');

const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = (arg) => {
  const localIP = getLocalIP();
  const port = arg.port || 8080;
  return {
    // 入口使用相对路径
    entry: "./src/index.tsx",
    output: {
      // 设置出口文件的名字
      filename: "bundle.js",
      clean: true,
      // 出口必须是绝对路径 所以需要使用 node的path模块
      path: path.resolve(__dirname, "../build"),
      publicPath: "/",
    },
    stats: "minimal",
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('autoprefixer')
                  ]
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource'
        },
        {
          test: /\.js$/,
          //使用exclude排除 该文件夹
          exclude: "/node_modules/",
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
        {
          test: /\.(ts|tsx)$/, // 匹配.ts文件
          exclude: /node_modules/, // 排除node_modules目录
          use: {
            loader: "babel-loader", // 使用babel-loader进行转换
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "ysy",
        template: "./public/index.html",
        inject: true,
      }),
      new CleanWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            `Your application is running at http://${localIP}:${port}`,
          ],
        },
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'], // 指定要检查的文件扩展名
        // 这俩是终端的错误提示和警告提示的开关
        failOnError: true,
        failOnWarning: false,
        formatter: 'stylish',
      }),
    ],
    resolve: {
      extensions: [".js", ".ts", ".tsx", "css", "scss"], // 添加.ts扩展名
      alias: {
        "@": path.resolve(__dirname, "../src/"), // 设置路径别名
        // 添加更多路径别名
      },
    },
  };
};

// 获取本地IP地址
function getLocalIP() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const prodConfig = require("./webpack.prod");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const devConfig = require("./webpack.dev");
//这里导出一个对象 在运行webpack的时候 它会调用 并且把 终端的指令转递过来
module.exports = function (env, argv) {
  const isProduction = env.production;
  process.env.production = isProduction;
  const config = isProduction ? prodConfig : devConfig;
  return merge(commonConfig(argv), config);
};
