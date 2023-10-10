import React, { useEffect, useState } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { variables } from "../../common/variables";
import { useMediaQueries } from "../../common/mediaQueryHook";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const StyledButton = styled(Button)`
  position: fixed;
  bottom: ${variables.spacingM};
  right: ${variables.spacingM};
`;

const InstallButton: React.FC = () => {
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

  if (!isVisible || !md) {
    return null;
  }

  return <StyledButton onClick={onClick}>Get the app</StyledButton>;
};

export default InstallButton;
