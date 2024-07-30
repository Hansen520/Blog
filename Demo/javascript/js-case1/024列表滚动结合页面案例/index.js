/*
 * @Date: 2023-09-15 09:43:23
 * @Description: description
 */
// 生成器函数，用于控制列表的滚动
function* scrollList(list) {
  let index = 0;
  while (index < list.length) {
    yield list[index];
    index++;
  }
}

// 异步函数，用于控制列表的滚动和暂停
async function scrollAndPause(list, duration) {
  const generator = scrollList(list);
  let item = generator.next().value;
  let isPaused = false;

  // 鼠标移入事件处理程序
  function handleMouseEnter() {
    isPaused = true;
  }

  // 鼠标移出事件处理程序
  function handleMouseLeave() {
    isPaused = false;
    scroll(); // 继续滚动列表
  }

  // 滚动列表函数
  async function scroll() {
    while (item) {
      if (!isPaused) {
        console.log(item); // 打印当前项
        await new Promise((resolve) => setTimeout(resolve, duration)); // 暂停一段时间
        item = generator.next().value;
      } else {
        await new Promise((resolve) => {
          // 等待鼠标移出事件触发
          const listener = () => {
            resolve();
            document.removeEventListener("mouseleave", listener);
          };
          document.addEventListener("mouseleave", listener);
        });
      }
    }
  }

  // 初始化滚动列表
  scroll();

  // 监听鼠标移入和移出事件
  document.addEventListener("mouseenter", handleMouseEnter);
  document.addEventListener("mouseleave", handleMouseLeave);
}

// 示例用法
const myList = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10"];
scrollAndPause(myList, 1000); // 每隔1秒滚动一次列表并暂停
