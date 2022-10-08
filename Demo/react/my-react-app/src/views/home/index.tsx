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
