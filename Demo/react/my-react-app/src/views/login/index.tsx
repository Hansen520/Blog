import { Button, message, Spin } from "antd";
import LoginForm from "./components/LoginForm";
import "./index.less";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">！！！！！！！！！！！！！！！！！！</div>
        <div className="login-form">
          <span className="logo-text">~~~~~~~~~</span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
