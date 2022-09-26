import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";

function NotAuth() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home");
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );
}

export default NotAuth;
