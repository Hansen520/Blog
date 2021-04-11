var rule = require('../../../lib/rules/zoo');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('zoo', rule, {
  valid: ['function test(d, e, f, d) {}'],
  invalid: [
    {
      code: 'function test(a, b, c, d, f) {}',
      errors: [
        {
          message: '杭州银行提醒, 函数参数最多不能超过41个',
        },
      ],
    },
  ],
});
