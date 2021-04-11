/**
 * @fileoverview html标签属性数量过多时需换行
 * @author jle
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules');
// module.exports.configs = {
//     base: {
//         rules: {
//             'attributes/max-attributes': 2,
//             'attributes/max-attribute-value-logical': 2
//         }
//     }
// }
