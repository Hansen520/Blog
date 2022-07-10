const vue3 = [
  'ref',
  'computed',
  'reactive',
  'onMounted',
  'nextTick',
  'watchEffect',
  'watch',
]; // 还有很多....

export default function autoImportPlugin() {
  return {
    name: 'vite-plugin-auto-import', // 必须的，将会在 warning 和 error 中显示
    enforce: 'pre',
    transform(code, id) {
      vueReg = /\.vue$/;
      if (vueReg.test(id)) {
        const helpers = new Set();
        vue3.forEach((api) => {
          // 去代码中匹配 api() 这样子的函数
          const reg = new RegExp(api + '(.*)');
          if (reg.test(code)) {
            // console.log(code, 22);
            // 匹配上了就往上加
            helpers.add(api);
          }
        });
        return code.replace(
          '<script setup>',
          `<script setup>

import {${[...helpers].join(',')}} from 'vue'       
`
        );
      }
      return code;
    },
  };
}
