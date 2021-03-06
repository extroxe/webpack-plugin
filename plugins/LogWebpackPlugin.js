class LogWebpackPlugin {
    constructor(doneCallback, emitCallback) {
        this.emitCallback = emitCallback
        this.doneCallback = doneCallback
    }
    apply(compiler) {
        compiler.hooks.emit.tap('LogWebpackPlugin', () => {
            // 在 emit 事件中回调 emitCallback
            console.log('我会在生成资源到 output 目录之前执行')
            this.emitCallback();
        });
        compiler.hooks.done.tap('LogWebpackPlugin', (err) => {
            // 在 done 事件中回调 doneCallback
            this.doneCallback();
        });
        compiler.hooks.compilation.tap('LogWebpackPlugin', () => {
            // compilation（'编译器'对'编译ing'这个事件的监听）
            console.log("The compiler 开始新的 new compilation...")
        });
        compiler.hooks.compile.tap('LogWebpackPlugin', () => {
            // compile（'编译器'对'开始编译'这个事件的监听）
            console.log("The compiler 开始工作了")
        });
    }
}

// 导出插件
module.exports = LogWebpackPlugin;
