import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import Button from "antd/es/button";
import styled from "styled-components";
import { variables } from "../../../common/variables";
import { useMediaQueries } from "../../../common/mediaQueryHook";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const StyledAlert = styled(Alert)`
  position: fixed;
  bottom: 0;
  right: 0;
  border: none;
  border-radius: 0;
  width: 100vw;
  background-color: ${variables.black};
  color: ${variables.white};

  & svg {
    color: ${variables.white};
  }
`;

const InstallAlert: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { md } = useMediaQueries();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      // Prevent the default browser install prompt
      event.preventDefault();

      // Stash the event so it can be triggered later.
      setDeferredPrompt(event);
      setIsVisible(true);
    };

    (window as any).addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    return () => {
      (window as any).removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [deferredPrompt]);

  const onClick = () => {
    deferredPrompt?.prompt();
    deferredPrompt?.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA installation");
      } else {
        console.log("User declined the PWA installation");
      }
    });
    setDeferredPrompt(null);
  };

  if (!isVisible || md) {
    return null;
  }

  return (
    <StyledAlert
      message="Get the full experience with the app"
      type="warning"
      action={
        <Button
          type="primary"
          size="small"
          onClick={onClick}
          style={{ marginRight: variables.spacingXs }}
        >
          Open
        </Button>
      }
      closable
    />
  );
};

export default InstallAlert;
