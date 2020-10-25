const HtmlWebpackPlugin = require('html-webpack-plugin');

class SetScriptTimestampPlugin {
    constructor(options) {
        this.options = options;
        this.name = "SetScriptTimestampPlugin"
    }

    // 方法一
      apply(compiler) {
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
        console.log(HtmlWebpackPluginData.assets.js[0])
        let JSfile = HtmlWebpackPluginData.assets.js[0];
        JSfile += `?${new Date().getTime()}`
        HtmlWebpackPluginData.assets.js = [JSfile]
        // console.log(HtmlWebpackPluginData)
        callback(null, HtmlWebpackPluginData)
    }

    // 方法二
    /*apply(compiler) {
        compiler.hooks.emit.tap(this.name, (compilation) => {
                Object.keys(compilation.assets).forEach((data) => {
                    let content = compilation.assets[data].source() // 欲处理的文本
                    if (data.includes(".html")) {
                        let scriptSrc = this.options && this.options.filename || "bundle.js"
                        scriptSrc += `?${new Date().getTime()}`
                        content = content.replace(
                            "<!--SetScriptTimestampPlugin inset script-->", `<script src="${scriptSrc}"/>`
                        );

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