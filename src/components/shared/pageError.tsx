import React from "react";
import { Alert, AlertProps } from "antd";

interface Props extends AlertProps {}

const PageError: React.FC<Props> = ({ ...props }) => {
  return (
    <Alert
      type="error"
      message={props.message}
      description={props.description}
      closable
      {...props}
    />
  );
};

export default PageError;
