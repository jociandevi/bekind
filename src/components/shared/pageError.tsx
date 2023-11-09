import React, { Suspense } from "react";
import { Alert, AlertProps } from "antd";
import { CenterAlignedFlexbox } from "./sharedLayouts";
import { RedoOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import { useNavigate } from "react-router-dom";

interface Props extends AlertProps {
  tryAgain?: boolean;
}

const PageError: React.FC<Props> = ({ tryAgain, ...props }) => {
  const navigate = useNavigate();

  return (
    <Alert
      type="error"
      message={props.message}
      description={
        props.description ?? tryAgain ? (
          <CenterAlignedFlexbox>
            <Suspense fallback={<></>}>
              <Button
                type="primary"
                icon={<RedoOutlined />}
                onClick={() => navigate(0)}
              >
                Let's try again
              </Button>
            </Suspense>
          </CenterAlignedFlexbox>
        ) : null
      }
      closable
      {...props}
    />
  );
};

export default PageError;
