const {defineConfig} = require('@vue/cli-service')
const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9529 // dev port

const name = "m-cinema"

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        // before: require('./mock/mock-server.js'),
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_LOCAL_SERVICE, // 你请求的第三方接口
                changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    // 路径重写，
                    '^/api': '' // 替换target中的请求地址
                }
            }
        }
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
})
