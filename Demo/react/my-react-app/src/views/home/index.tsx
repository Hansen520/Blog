/*
 * @Author: hansen
 * @Date: 2022-09-22 14:22:08
 * @LastEditors: hansen
 * @LastEditTime: 2022-10-26 13:21:55
 * @FilePath: \my-jirad:\project\Blog\Demo\react\my-react-app\src\views\home\index.tsx
 */
import "./index.less";
function Home() {
  const handleClick = (e: any) => {
    console.log(e, 123);
  };
  return (
    <div>
      <button onClickCapture={handleClick}>
        <span>qqqqqqqqqqqqqqqqqqqqqqq</span>
      </button>
    </div>
  );
}

export default Home;
