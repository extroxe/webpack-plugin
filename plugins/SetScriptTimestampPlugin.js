const HtmlWebpackPlugin = require('html-webpack-plugin');

/*function SetScriptTimestampPlugin(options) {
    this.name = "SetScriptTimestampPlugin"
    this.options = options;
}
SetScriptTimestampPlugin.prototype.apply = function(compiler){
    compiler.hooks.compilation.tap(this.name, (compilation, callback) => {
            const run = this.run.bind(this, compilation);
            if (compilation.hooks.htmlWebpackPluginAfterHtmlProcessing) {
                // html-webpack-plugin v3 插件
                compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(this.name, run);
            } else {
                // html-webpack-plugin v4
                HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(this.name, run);
                // HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(this.name, run);
                // HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(this.name, run);
                // HtmlWebpackPlugin.getHooks(compilation).alterAss
                // etTagGroups.tapAsync(this.name, run);
                // HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(this.name, run);
            }
        }
    );
}

SetScriptTimestampPlugin.prototype.run = function(compilation, HtmlWebpackPluginData, callback){
    console.log(HtmlWebpackPluginData.assets.js[0])
    let JSfile = HtmlWebpackPluginData.assets.js[0];
    JSfile += `?${new Date().getTime()}`
    HtmlWebpackPluginData.assets.js = [JSfile]
    // console.log(HtmlWebpackPluginData)
    callback(null, HtmlWebpackPluginData)
}*/
class SetScriptTimestampPlugin {
    constructor(options) {
        this.options = options;
        this.name = "SetScriptTimestampPlugin"
    }

    // 方法一
      apply(compiler) {
        console.log(compiler.plugin)
          compiler.hooks.compilation.tap(this.name, (compilation, callback) => {
                  const run = this.run.bind(this, compilation);
                  if (compilation.hooks.htmlWebpackPluginAfterHtmlProcessing) {
                      // html-webpack-plugin v3 插件
                      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(this.name, run);
                  } else {
                      // html-webpack-plugin v4
                      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(this.name, run);
                      // HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(this.name, run);
                      // HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(this.name, run);
                      // HtmlWebpackPlugin.getHooks(compilation).alterAss
                      // etTagGroups.tapAsync(this.name, run);
                      // HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(this.name, run);
                  }
              }
          );
      }

      run(compilation, HtmlWebpackPluginData, callback) {
        console.log(compilation.assetTags)
          const jsList = HtmlWebpackPluginData.assets.js
          const timeStrip = `?${new Date().getTime()}`
          HtmlWebpackPluginData.assets.js = jsList.map(item => {
              item += timeStrip
              return item
          })
          console.log(HtmlWebpackPluginData.assets)
          // console.log(HtmlWebpackPluginData)
          callback(null, HtmlWebpackPluginData)
      }

    // 方法二
   /* apply(compiler) {
        compiler.hooks.emit.tap(this.name, (compilation) => {
                Object.keys(compilation.assets).forEach((data) => {
                    let content = compilation.assets[data].source() // 欲处理的文本
                    const timeStr = `?${new Date().getTime()}`
                    if (data.includes(".html")) {
                        let newScriptStr = ""
                        compilation.namedChunks.forEach(item => {
                            newScriptStr += `<script src="${item.files[0] + timeStr}"></script>`
                        })
                        const reg = new RegExp("<script\\b[^>]*>[\\s\\S]*<\\/script>")
                        content = content.replace(reg, newScriptStr)
                        compilation.assets[data] = {
                            source() {
                                return content
                            },
                            size() {
                                return content.length
                            }
                        }
                    }
                })
            }
        );
    }*/
}

module.exports = SetScriptTimestampPlugin;
