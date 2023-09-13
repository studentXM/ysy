class ShowAddressOnSuccessPlugin {
    constructor(options) {
      // 接受外部传递的项目地址
      this.address = options && options.address ? options.address : "http://localhost:3000";
      this.color = options && options.color ? options.color : "\x1b[44m\x1b[97m"; // 默认颜色为蓝色背景，白色字体
      this.resetColor = "\x1b[0m"; // 重置颜色
    }
  
    apply(compiler) {
      // 注册 "done" 钩子，该钩子会在构建完成后触发
      compiler.hooks.done.tap("ShowAddressOnSuccessPlugin", () => {
        // 显示项目地址并使用指定的颜色
        console.log(`${this.color}项目地址：${this.address}${this.resetColor}`);
      });
    }
  }
  
  module.exports = ShowAddressOnSuccessPlugin;