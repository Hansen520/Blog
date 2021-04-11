// 这句话是对命名空间的注解，并不是引用
///<reference path="components.ts" />

namespace Home {
  // 内部也可以导出命名空间
  export namespace Han {
    export const teacher: Components.user = {
      name: 'han'
    };
  }
  // 命名空间中还可以再写一个子的命名空间，子命名空间里也可以写入其它内容, 通过export 暴露出去。
  export class Page {
    constructor() {
      new Components.Header();
      new Components.Content();
      new Components.Footer();
      new Components.Footer();
    }
  }
}
