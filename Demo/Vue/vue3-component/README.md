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

npm i axios --save

npm install -D sass

npm i eslint -D

在项目根目录下执行 npx eslint --init,然后按照终端操作的提示完成一系列设置来创建配置文件。你可以按照下图所示的选择来始化 ESLint


npm install nprogress -D

有些渲染器的知识，https://github.com/shengxinjing/vue3-vs-vue2.git 有很好的实现

响应式机制的主要功能就是，可以把普通的 JavaScript 对象封装成为响应式对象，拦截数据的获取和修改操作，实现依赖数据的自动化更新。