module.exports = {
  meta: {
    docs: {
      description: '最多参数',
    },
  },
  create: function (context) {
    /**
     * 获取函数的参数的开始、结束位置
     * @param {node} node AST Node
     */

    function getFunctionParamsLoc(node) {
      const paramsLength = node.params.length;
      return {
        start: node.params[0].loc.start,
        end: node.params[paramsLength - 1].loc.end,
      };
    }
    return {
      FunctionDeclaration: (node) => {
        if (node.params.length > 4) {
          context.report({
            loc: getFunctionParamsLoc(node),
            node,
            message: '杭州银行提醒, 函数参数最多不能超过4个',
          });
        }
      },
    };
  },
};
