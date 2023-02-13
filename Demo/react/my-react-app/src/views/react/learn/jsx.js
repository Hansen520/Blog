/*
 * @Author: hansen
 * @Date: 2023-01-31 13:47:51
 * @LastEditors: hansen
 * @LastEditTime: 2023-01-31 13:55:33
 * @FilePath: \user-end\src\pages\Test\jsx.js
 */
const fs = require('fs');
const babel = require('@babel/core');

fs.readFile('./element.tsx', (e, data) => {
    const code = data.toString('utf-8');
    const result = babel.transformSync(code, {
        plugins: ["@babel/plugin-transform-react-jsx"],
    });
    fs.writeFile('./element.tsx', result.code, () => {});
});