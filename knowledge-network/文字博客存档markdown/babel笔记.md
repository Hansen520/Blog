## Babel的API

### bebel的编译流程

babel 的编译流程分为三步：parse、transform、generate，每一步都暴露了一些 api 出来。

- parse阶段有 `@babel/parser` ，对源码进行 parse，可以通过 plugins、sourceType 等来指定 parse 语法，把源码转为AST。
- transform 阶段有 `@babel/traverse`，可以遍历 AST，并调用 visitor 函数修改 AST，修改 AST 自然涉及到 AST 的判断、创建、修改等，这时候就需要 `@babel/types` 了，当需要批量创建 AST 的时候可以使用 `@babel/template` 来简化 AST 创建逻辑，进行批量创建。
- generate 阶段会把 AST 打印为目标代码字符串，同时生成 sourcemap，需要 `@babel/generator` 包
- 中途遇到错误想打印代码位置的时候，使用 `@babel/code-frame` 包，也就是说这个包可以创建友好的报错信息，
- babel 的整体功能通过 `@babel/core` 提供，基于上面的包完成 babel 整体的编译流程，并应用 plugin 和 preset，执行一些列的流程体系。

主要就是 `@babel/parser`，`@babel/traverse`，`@babel/generator`，`@babel/types`，`@babel/template`



