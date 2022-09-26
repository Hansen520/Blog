## Vite概述

Vite 并不是基于 Webpack 的，它有自己的开发服务器，利用浏览器中的原生 ES 模块。这种架构使得 Vite 比 Webpack 的开发服务器快了好几个数量级。Vite 采用 Rollup 进行构建，速度也更快。

## 创建基本的模板项目

根据官网提供的，使用了 `react-ts` 模板，创建完成后，页面跟`create-react-app`相差不大。

```javascript
npm init vite@latest my-react-app --template react-ts
```

看到`index.html`模板的时候，`script`标签变成这种，`type=”module”`，关键就是这个。

```javascript
<script type="module" src="/src/main.tsx"></script>
```

## 配置环境变量

vite 提供了开发模式和生产模式

这里我们可以建立 4 个 `.env` 文件，一个通用配置和三种环境：开发、测试、生产。

- env文件中的**变量名**建议以**VITE_APP**开头，和vue cli中的VUE_APP相同 ，用法也一致

1. .env文件 通用配置 用来配置一些公用的，栗子：网页的title VITE_APP_TITLE=hello
2. .env.dev文件 开发环境配置 以api url为例 VITE_APP_PROXY_URL=/api
3. .env.test文件 测试环境配置 以api url为例 VITE_APP_PROXY_URL=/api
4. .env.prod文件 测试环境配置 以api url为例 VITE_APP_PROXY_URL=/apiProd

在写api的时候可以这么使用

```text
const baseUrl = import.meta.env.VITE_APP_PROXY_URL
export const getTabList = (params) => {
  return axios({
    method: 'post',
    url: baseUrl + 'QueryTabReq',
    data: params
  })
}
```

命令行界面 **package.json**

```typescript
"scripts": {
    "dev": "vite --mode dev",
    "test": "vite --mode test",
    "prod": "vite --mode prod",
    "build:test": "vite --mode test",
    "build:prod": "vite --mode prod",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
```

## 配置alias别名

配置别名 像`vue cli`一样 以`@`引入文件

如果`path`或者`__dirname`报红，需要安装支持`@types/node`到本地 `npm i @types/node -D`

**vite.config.js**

```ty
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
},
```

配置了`@`别名之后去引入文件发现没有智能提示，需要根目录添加一个`jsconfig.json`文件。

```typescript
{
  "compilerOptions": {
      "baseUrl": "./",
      "paths": {
          "@/*": ["src/*"]
      }
  },
  "exclude": ["node_modules", "dist"]
}
```

## 配置proxy代理

`vite.config.js`中配置`server`

```typescript
server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {  
        target: 'http://1212333.com',
        ws: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
```

## 安装Ant design 按需引入

```text
npm install antd --save
按需引入
npm install less less-loader vite-plugin-style-import -D
```

**vite.config.ts**

```typescript
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
plugins:[
 react()
 createStyleImportPlugin({
    resolves: [AntdResolve()]
 })
]
```

这边会有一个报错信息，报错信息如下。

```typescript
使用 failed to load config from D:\project\Blog\Demo\react\my-react-app\vite.config.ts
error when starting dev server:
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'consola' imported from D:\project\Blog\Demo\react\my-react-app\node_modules\vite-plugin-style-import\dist\index.mjs
```

这是因为插件的使用了 `consola` 包，但是我们没有安装。所以需要安装 `consola`

**还有就是在vite2.0版本需要使用的是`createStyleImportPlugin`不要使用`styleImprot`了！**

看下面配置代码

**vite.config.ts**

```typescript
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
export default defineConfig({
    plugins: [react(), createStyleImportPlugin({
      resolves: [AntdResolve()]
    })],
});
```

### 对antd主题色进行配置

antd的主题色配置，这种比较好用,在

```typ
css: {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
        modifyVars: {
          "primary-color": "#1DA57A",
          "link-color": "#1DA57A",
          "border-radius-base": "2px"
        }
    }
  }
}
```

## build

在build的时候发现打包后的文件比较大，在build配置中添加rollupOptions

```typescript
// 忽略某些文件不分割
var ignoreFile = []
...
rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 使用这种方式在项目里确实遇到过因为分割包后,因为加载问题出现一些报错的异常情况,所以声明了ignoreFile对有问题的文件不进行分割处理
          if (id.includes('node_modules')) {
            var fileName = id.toString().split('node_modules/')[1].split('/')[0].toString()
            if (ignoreFile.indexOf(fileName) === -1) {
              return fileName
            }
          }
        }
      }
    }
  ...
```

1. 打包后，出现的文件过大，目前看到只有通过rollupOptions来进行切片，官方没有给出相应demo，还要去rollup查看如何使用，网上的配置代码也不多，可能很多项目并没有用到切片并没有像webpack那种有成熟的代码分割方案SplitChunksPlugin。比如项目比较大时，react，antd，lodash都会打包成vendor的大包，这样页面加载容易出现白屏现象
2. 开发环境下,如果删掉了node_modules,每次进入一个新页面,因为要在node_module文件中的.vite文件夹生成加载的文件,会导致进入一个新页面就会一直刷新,直到页面用到的所有模块都加入到.vite文件夹中为止，项目体量小的话是没有多大感觉，但是页面多的话,有了几十个页面，就会经常出现这种体验不好的问题
3. 目前eslint的报错提醒没有，不会在命令面包上提示，代码报错也只在浏览器上才有提示，所以加上husky，在提交代码前做一次eslint检测很有必要

### 参考文章

https://blog.csdn.net/weixin_41277748/article/details/116431789 (rollupOptions 处理)

https://juejin.cn/post/6933562433264943111#heading-4

https://juejin.cn/post/6938671679153373214#heading-6















