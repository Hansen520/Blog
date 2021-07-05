// 逢山搭路，遇水搭桥
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
// 增加import
const compilerSfc = require('@vue/compiler-sfc');
// 解析文档
const compilerDom = require('@vue/compiler-dom');
const app = new Koa();
app.use(async (ctx) => {
  const { url, query } = ctx.request;
  console.log('url:' + url, __dirname, url.slice(1), ', query:', query.type);
  if (url === '/') {
    ctx.type = 'text/html';
    let content = fs.readFileSync('./index.html', 'utf-8');
    content = content.replace(
      '<script',
      `<script>
        window.process = {
          env: {
            NODE_ENV: 'dev',
          },
        };</script><script
      `
    );

    ctx.body = content;
  } else if (url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1));
    ctx.type = 'application/javascript';
    let content = fs.readFileSync(p, 'utf-8');
    content = rewriteImport(content);
    ctx.body = content;
    // 以这个开头的进行转换
  } else if (url.startsWith('/@modules/')) {
    // 第三方库对应的es入口给他
    // /@modules/vue => node_modules/vue
    const prefix = path.resolve(
      __dirname,
      'node_modules',
      url.replace('/@modules/', '')
    );
    console.log('prefix', prefix);
    const module = require(prefix + '/package.json').module;
    const p = path.resolve(prefix, module);
    const ret = fs.readFileSync(p, 'utf-8');
    ctx.type = 'application/javascript';
    // 避免第三方库里还有第三方库
    ctx.body = rewriteImport(ret);
  } else if (url.endsWith('.css')) {
    const p = path.resolve(__dirname, url.slice(1));
    const file = fs.readFileSync(p, 'utf-8');
    const content = `
      const css = "${file.replace(/\n/g, '')}"
      let link = document.createElement('style')
      link.setAttribute('type', 'text/css')
      document.head.appendChild(link)
      link.innerHTML = css
      export default css
    `;
    ctx.type = 'application/javascript';
    ctx.body = content;
  } else if (url.indexOf('.vue') > -1) {
    // vue单⽂件组件
    const p = path.resolve(__dirname, url.split('?')[0].slice(1));
    const { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf-8'));
    if (!query.type) {
      ctx.type = 'application/javascript';
      // 借⽤vue⾃导的compile框架 解析单⽂件组件，其实相当于vue-loader做的事情
      ctx.body = `
    ${rewriteImport(
      descriptor.script.content.replace('export default ', 'const __script = ')
    )}
    import { render as __render } from "${url}?type=template"
    __script.render = __render
    export default __script
    `;
    } else if (query.type === 'template') {
      // 模板内容
      const template = descriptor.template;
      // 要在server端吧compiler做了
      const render = compilerDom.compile(template.content, {
        mode: 'module',
      }).code;
      ctx.type = 'application/javascript';
      ctx.body = rewriteImport(render);
    }
  }
});

function rewriteImport(content) {
  // 'import xx from 'xxx'// 正则将xxx变成路径形式
  return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
    console.log('s', s0, s1);
    // . ../ /开头的，都是相对路径
    if (s1[0] !== '.' && s1[1] !== '/') {
      return ` from '/@modules/${s1}'`;
    } else {
      return s0;
    }
  });
}
app.listen(3000, () => {
  console.log('Vite Start at 3000 !!!');
});
