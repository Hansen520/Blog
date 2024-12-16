/*
 * @Date: 2024-12-16 15:39:41
 * @Description: description
 */
// 争对源码处理，我们监听compilation阶段的optimizeModules钩子，在这个阶段，模块的原始源代码可以被访问和修改
// 统计console数量
class ConsoleLogStatsPlugin {
    apply (compiler) {
        compiler.hooks.compilation.tap('ConsoleLogStatsPlugin', compilation => {
            compilation.moduleTemplates.javascript.hooks.render.tap("ConsoleLogStatsPlugin", (moduleSource, module) => {
                const consoleLogMatches = moduleSource.source().match(/console\.log/g) || [];
                if (consoleLogMatches.length > 0) {
                    console.log(`模块 ${module.nameForCondition()} 有 ${consoleLogMatches.length} console.log 被调用`);
                }
                return moduleSource;
            });
        })
    }
}

module.exports = ConsoleLogStatsPlugin;