const fs = require('fs');
const path = require('path');
// 代码转化为语法树
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
// es6->es5
const babel = require('@babel/core');

/**
 * 分析单个模块
 */
function getModuleInfo(file) {
  // 读取文件
  const body = fs.readFileSync(file, 'utf-8');

  // 转换语法树AST(astexplorer.net)
  const ast = parser.parse(body, {
    sourceType: 'module', // 表示我们要解析的是ES模块
  });

  // 收集依赖
  const deps = {};
  traverse(ast, {
    // visitor
    ImportDeclaration({ node }) {
      // console.log('依赖收集', node);
      const dirname = path.dirname(file);
      const abspath = './' + path.join(dirname, node.source.value);
      deps[node.source.value] = abspath;
      console.log(deps, dirname);
    },
  });
  // ES6->ES5
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  });
  const moduleInfo = {
    file,
    deps,
    code,
  };
  return moduleInfo;
}

// const info = getModuleInfo('./src/index.js');
// console.log('info', info);

/**
 *
 * 模块解析
 * @param {*} file
 */

function parseModules(file) {
  const entry = getModuleInfo(file);
  const temp = [entry];
  const depsGraph = {};

  getDeps(temp, entry);

  temp.forEach((info) => {
    // 最后出来的语法树
    depsGraph[info.file] = {
      deps: info.deps,
      code: info.code,
    };
  });
  return depsGraph;
}

function getDeps(temp, { deps }) {
  Object.keys(deps).forEach((key) => {
    const child = getModuleInfo(deps[key]);
    temp.push(child);
    // 因为不断有新的模块进来，所以使用递归
    getDeps(temp, child);
  });
}

// const content = parseModules('./src/index.js');
// console.log('content', content);

function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
    function require(file) {
    function absRequire(relPath) {
    return require(graph[file].deps[relPath])
    }
    var exports = {};
    (function (require,exports,code) {
    eval(code)
    })(absRequire,exports,graph[file].code)
    return exports
    }
    require('${file}')
    })(${depsGraph})`;
}

// 导出生成dist文件
const content = bundle('./src/index.js');
!fs.existsSync('./dist') && fs.mkdirSync('./dist');
fs.writeFileSync('./dist/bundle.js', content);
