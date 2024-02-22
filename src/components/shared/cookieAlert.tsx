import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import Button from "antd/es/button";
import styled from "styled-components";
import {
  darkGray,
  spacingS,
  spacingXs,
  spacingXxxs,
  white,
} from "../../common/variables";

const StyledAlert = styled(Alert)`
  position: fixed;
  bottom: 0;
  right: 0;
  border: none;
  border-radius: 0;
  width: 100vw;
  background-color: ${darkGray};
  color: ${white};
  padding: ${spacingXxxs} ${spacingS};
  line-height: 1.5;

  & svg {
    color: ${white};
    margin-top: ${spacingXs};
  }

  & .ant-alert-message,
  .ant-alert-description {
    color: ${white};
    margin: 0;
    font-size: small;

    & a {
      color: ${white};
      text-decoration: underline;
    }
  }
`;

export const showCookiesInfo = () => {
  const hasSeenCookies = localStorage.getItem("acceptCookies");

  if (!hasSeenCookies) {
    return true;
  } else {
    return false;
  }
};

const CookieAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const doDisplay = showCookiesInfo();
    setIsVisible(doDisplay);
  }, []);

  const accept = () => {
    setIsVisible(false);
    localStorage.setItem("acceptCookies", "yes");
  };

  const onClose = () => {
    setIsVisible(false);
    localStorage.setItem("acceptCookies", "yes");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <StyledAlert
      message="We use cookies to get better."
      description={
        <a type="link" href="/privacy-policy">
          Learn more
        </a>
      }
      type="warning"
      action={
        <Button
          type="default"
          size="small"
          onClick={accept}
          style={{ marginRight: spacingXs, marginTop: spacingXxxs }}
        >
          Accept
        </Button>
      }
      closable
      onClose={onClose}
    />
  );
};

export default CookieAlert;
