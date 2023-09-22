// eslint-disable-next-line @typescript-eslint/no-var-requires
const os = require("os");
// 获取本地IP地址
module.exports = function getLocalIP() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];
        for (const iface of interfaces) {
            if (iface.family === "IPv4" && iface.internal) {
                return iface.address;
            }
        }
    }
    return "localhost";
}