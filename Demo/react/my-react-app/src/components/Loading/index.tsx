import React from "react";
import { Spin } from "antd";

const Loading = ({ tip = "Loading..." }: { tip?: string }) => {
  return <Spin tip={tip} size="large" className="request-loading" />;
};

export default Loading;
