import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      icon={<ArrowLeftOutlined />}
      shape="circle"
      onClick={() => navigate(-1)}
    />
  );
};

export default BackButton;
