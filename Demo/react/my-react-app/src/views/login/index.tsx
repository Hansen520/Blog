import { Button, message } from "antd";
import "./index.less";

const Login = () => {
  return (
    <Button
      type="primary"
      onClick={() => {
        message.success("登入成功！");
      }}
    >
      dengr
    </Button>
  );
};

export default Login;
