import { Button, Result } from "antd";
import { useNavigate } from "react-router";
import { HOME_URL } from "@/config/config";
const NotNetwork = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(HOME_URL);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotNetwork;
