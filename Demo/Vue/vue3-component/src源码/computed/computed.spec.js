import { ref } from '../ref';
import { reactive } from '../reactive';
import { computed } from '../computed';

describe('computed 测试', () => {
  it('computed 基本使用', () => {
    const ret = reactive({ count: 1 });
    const num = ref(2);
    const sum = computed(() => num.value + ret.count);
    expect(sum.value).toBe(3);

    ret.count++;
    expect(sum.value).toBe(4);
    num.value = 10;
    expect(sum.value).toBe(12);
  });
  it('computed 属性修改', () => {
    const author = ref('Hansen');
    const course = ref('玩转 Vue3');
    const title = computed({
      get() {
        return author.value + ':' + course.value;
      },
      set(val) {
        [author.value, course.value] = val.split(':');
      },
    });
    expect(title.value).toBe('Hansen:玩转 Vue3');

    author.value = 'dabai';
    course.value = '重学前端';
    expect(title.value).toBe('dabai: 重学前端');

    // 计算属性赋值
    title.value = '王争: 数据结构与算法之美';
    expect(author.value).toBe('李二白');
    expect(course.value).toBe('数据结构与算法之美');
  });
});
