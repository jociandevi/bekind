import React from "react";
import { Alert, AlertProps, Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CenterAlignedFlexbox } from "./sharedLayouts";

interface Props extends AlertProps {}

const PageError: React.FC<Props> = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <Alert
      type="error"
      message={props.message}
      description={
        props.description || (
          <CenterAlignedFlexbox>
            <Button
              type="primary"
              icon={<RedoOutlined />}
              onClick={() => navigate(0)}
            >
              Let's try again
            </Button>
          </CenterAlignedFlexbox>
        )
      }
      closable
      {...props}
    />
  );
};

export default PageError;
