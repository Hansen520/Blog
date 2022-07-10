import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import {
  isTryStatement,
  tryStatement,
  isBlockStatement,
  catchClause,
  identifier,
  blockStatement,
} from '@babel/types';
import { transformFromAstSync } from '@babel/core';

const catchStatement = parse(`
  console.error(err)
  console.log('https://stackoverflow.com/search?q=[js]+'+encodeURI(err.message))
`).program.body;

export default function autoImportPlugin() {
  return {
    name: 'vite-plugin-auto-try', // 必须的，将会在 warning 和 error 中显示
    enforce: 'pre',
    transform(code, id) {
      fileReg = /\.js$/;
      // 现在针对js文件
      if (fileReg.test(id)) {
        const ast = parse(code, {
          sourceType: 'module',
        });
        traverse(ast, {
          AwaitExpression(path) {
            console.log(path, 31);
            if (path.findParent((path) => isTryStatement(path.node))) {
              // 已经有try了
              return;
            }
            // isBlockStatement 是否函数体
            const blockParentPath = path.findParent((path) =>
              isBlockStatement(path.node)
            );
            const tryCatchAst = tryStatement(
              blockParentPath.node,
              // ast中新增try的ast
              catchClause(identifier('err'), blockStatement(catchStatement))
            );
            // 使用有try的ast替换之前的ast
            blockParentPath.replaceWithMultiple([tryCatchAst]);
          },
        });
        // 生成代码，generate
        code = transformFromAstSync(ast, '', {
          configFile: false,
        }).code;

        return code;
      }
      return code;
    },
  };
}
