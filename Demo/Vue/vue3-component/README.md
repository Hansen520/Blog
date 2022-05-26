# Vue 3 + Vite

npm init @vitejs/app
pnpm i vue-router@next vuex@next
npm install vuex@next


一些好用的vueUse函数
https://vueuse.org/


在从 JSX 到 createVNode 函数的转化过程中，我们需要安装一个 JSX 插件。在项目的根目录下，打开命令行，执行下面的代码来安装插件

npm install @vitejs/plugin-vue-jsx -D

```javascript
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({ plugins: [vue(),vueJsx()]})

```

