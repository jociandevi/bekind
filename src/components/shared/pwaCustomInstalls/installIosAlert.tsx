import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import styled from "styled-components";
import { useMediaQueries } from "../../../common/mediaQueryHook";
import { black, white } from "../../../common/variables";

const StyledAlert = styled(Alert)`
  position: fixed;
  bottom: 0;
  right: 0;
  border: none;
  border-radius: 0;
  width: 100vw;
  background-color: ${black};
  color: ${white};

  & svg {
    color: ${white};
  }
`;

const InstallIosAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { md } = useMediaQueries();

  useEffect(() => {
    const iosInstallWasClosedAt = localStorage.getItem("closedIosInstallAt");
    if (!iosInstallWasClosedAt) {
      setIsVisible(true);
    } else {
      const now = new Date();
      const closedAt = new Date(iosInstallWasClosedAt);
      const diff = now.getTime() - closedAt.getTime();
      const diffInDays = diff / (1000 * 3600 * 24);
      if (diffInDays > 7) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, []);

  const closeIosAlert = () => {
    setIsVisible(false);
    const now = new Date();
    localStorage.setItem("closedIosInstallAt", now.toISOString());
  };

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  const isInStandaloneMode = () => {
    return "standalone" in window.navigator && window.navigator["standalone"];
  };

  if (!isVisible || md || !isIos() || isInStandaloneMode()) {
    return null;
  }

  return (
    <StyledAlert
      message='Get the full experience with the app. Click on "Share" > "Add to Home Screen"'
      type="warning"
      closable
      onClose={closeIosAlert}
    />
  );
};

export default InstallIosAlert;
