const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const LogWebpackPlugin = require('../plugins/logWebpackPlugin');
const FileListPlugin = require('../plugins/FileListPlugin');
const PrefetchPlugin = require('../plugins/PrefetchPlugin');
const CodeBeautify = require('../plugins/CodeBeautify');
const SetScriptTimestampPlugin = require('../plugins/SetScriptTimestampPlugin');
const path = require('path');        //node内置path模块，该模块主要集成文件系统路径操作API

const config = {
    mode: 'development',        //webpack打包的模式，上述命令里有介绍，也可以在本配置中配置
    entry: {    //js的入口文件，支持多入口 注释①
        main: path.resolve(__dirname,'../src/index.js'),
        index: path.resolve(__dirname,'../src/entry.js')
    },
    output: {   //js打包压缩后的出口文件，多入口时对应的配置应做相对变化 注释②
        path: path.resolve(__dirname,'../dist'),
        publicPath: "",
        filename:'[name].bundle.js'
    },
    module: {
        rules: [] // 配置loder使用的规则、作用范围、控制输出的名称、位置等；主要作用是编译，解析文件； 暂时不使用loader
    },
    plugins: [
        new HtmlWebpackPlugin({filename: "index.html",template: './src/index.html'}),  //根据项目提供HTML模板，生成新页面，并将对应的输出打包压缩输出的js，链接到页面中；详细配置见注释④
        /* new LogWebpackPlugin(() => {
            // Webpack 模块完成转换成功
            console.log('emit 事件发生啦，所有模块的转换和代码块对应的文件已经生成好~')
        } , () => {
            // Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作
            console.log('done 事件发生啦，成功构建完成~')
        }),*/
        // new FileListPlugin(),
        // new PrefetchPlugin(),
        new SetScriptTimestampPlugin(),
        // new CodeBeautify({filename: "bundle.js"}),
    ],
    devServer: {        //webpack-dev-server配置（仅开发环境需要）
        contentBase: path.join(__dirname, '../dist'), //编译打包文件的位置
        publicPath: '/',
        port: 1111,                 //服务器端口号
        // host: '0.0.0.0',
        // proxy: {},                  //代理列表
        compress: true,
        historyApiFallback: true,   //开启服务器history重定向模式
    }
};
module.exports = config;
