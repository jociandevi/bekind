import React from "react";
import { ButtonProps } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Button from "antd/es/button";

interface Props extends ButtonProps {}

const BackButton: React.FC<Props> = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <Button
      icon={<ArrowLeftOutlined />}
      shape="circle"
      onClick={() => navigate(-1)}
      {...props}
    />
  );
};

export default BackButton;
