import React from "react";
import { Alert } from "antd";

interface Props {
  message: string;
  description?: string;
}

const PageError: React.FC<Props> = ({ message, description }) => {
  return (
    <Alert type="error" message={message} description={description} closable />
  );
};

export default PageError;
