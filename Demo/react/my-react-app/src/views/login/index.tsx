import { Button, message, Spin } from "antd";
import "./index.less";

const Login = () => {
  return (
    <Button
      type="primary"
      onClick={() => {
        message.success("登入成功！");
      }}
    >
      <Spin />
      登入
    </Button>
  );
};

export default Login;
