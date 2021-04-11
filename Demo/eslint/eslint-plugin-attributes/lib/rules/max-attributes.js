/**
 * @fileoverview  html标签属性数量过多时需换行
 * @author jle
 * @param { max } 最多允许的属性数量，可选
 * @param { attrStrLimit } 单个属性的字符串长度超出时，即使属性数量没有超过max，也要换行
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: '标签不能是横杠的写法',
      category: 'Fill me in',
      recommended: false,
    },
  },

  create: function (context) {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    /**
     * token是什么：词法分析中的一个词对象
     * 遇到中文时，loc定位会不准确
     * 只要有loc等属性，就可以算一个node节点
     * schema定义可选参数
     *
     * ***/
    return context.parserServices.defineTemplateBodyVisitor(
      // Event handlers for <template>.
      {
        VElement(node) {
          if (node) {
            // 属性没有换行,startTag的内容都在同一行
            if (/-/g.test(node.name)) {
              context.report({
                node,
                loc: node.loc,
                message: '杭州银行提醒: {{name}}组件不能是横杠的写法',
                data: {
                  name: node.name,
                },
              });
            }
          }
        },
      },
      // Event handlers for <script> or scripts. (optional)
      {
        Program(node) {
          //...
        },
      }
    );
  },
};
