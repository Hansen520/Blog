import md5 from "js-md5";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/api/modules/login";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import {
  UserOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Login } from "@/api/interface";
import { HOME_URL } from "@/config/config";

function LoginForm(props: any) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (loginForm: Login.ReqLoginForm) => {
    try {
      setLoading(true);
      loginForm.password = md5(loginForm.password);
      const { data } = await loginApi(loginForm);
      props.setToken(data?.access_token);
      message.success("登陆成功！");
      navigate(HOME_URL);
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed", errorInfo);
  };
  // 登陆
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password
          autoComplete="new-password"
          placeholder="密码：123456"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          onClick={() => {
            form.resetFields();
          }}
          icon={<CloseCircleOutlined />}
        >
          重置
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<UserOutlined />}
        >
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
}

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(LoginForm);
