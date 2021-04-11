/**
 * @fileoverview  html标签属性数量过多时需换行
 * @author jle
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/max-attributes');
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2018 },
});
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('max-attributes', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '',
    },
    {
      filename: 'test.vue',
      code: `<template>
                  <hz-form></hz-form>
                  <hz-log></hz-log>
                  <hz-logs></hz-logs>  
            </template>`,
    },
  ],

  invalid: [
    {
      code: `<template>
               <hz-form></hz-form> 
            </template>`,
      output: `<template>
                    <hzForm></hzForm> 
                </template>`,
      errors: [
        {
          type: 'VElement',
          message: '不能以驼峰写法',
        },
      ],
    },
    // {
    //   code: `<template>
    //                    <img data-id="foo" a="1">
    //                 </template>`,
    //   output: `<template>
    //                    <img
    //                      data-id="foo"
    //                      a="1">
    //                 </template>`,
    //   options: [{ attrStrLimit: 2 }],
    //   errors: [
    //     {
    //       type: 'VElement',
    //     },
    //   ],
    // },
    // {
    //   code: `<template>
    //                    <custom data-id="foo" a="1" b="1" c="1"></custom>
    //                 </template>`,
    //   output: `<template>
    //                    <custom
    //                      data-id="foo"
    //                      a="1"
    //                      b="1"
    //                      c="1">
    //                    </custom>
    //                 </template>`,
    //   errors: [
    //     {
    //       type: 'VElement',
    //     },
    //   ],
    // },
    // {
    //   code: `<template><custom
    //                      data-id="foo"
    //                       a="1"
    //                     ></custom></template>`,
    //   options: [{ attrStrLimit: 33 }],
    //   output: `<template><custom data-id="foo" a="1"></custom></template>`,
    //   errors: [
    //     {
    //       type: 'VElement',
    //     },
    //   ],
    // },
  ],
});
