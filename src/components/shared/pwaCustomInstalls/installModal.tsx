import React, { useEffect, useState } from "react";
import AntdModal from "../modal";
import BeKindLogo from "../../../logoOutbreak_v1.png";
import { useMediaQueries } from "../../../common/mediaQueryHook";
import { Button } from "antd";
import { CenterAlignedFlexboxCol } from "../sharedLayouts";
import styled from "styled-components";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const StyledButton = styled(Button)`
  border: none;
  width: 100%;
`;

const InstallModal: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { md } = useMediaQueries();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      // Prevent the default browser install prompt
      event.preventDefault();

      // Stash the event so it can be triggered later.
      setDeferredPrompt(event);
      // this modal should only appear on phones
      if (!md) {
        setIsModalOpen(true);
      }
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
  }, [deferredPrompt, md]);

  const handleOk = () => {
    setIsModalOpen(false);
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

  return (
    <AntdModal
      title="Get the full experience with the app"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onOk={handleOk}
      description="Enjoy the additional features."
      imageUrl={BeKindLogo}
      modalHeight={334}
      isProfileImage
      footer={
        <CenterAlignedFlexboxCol style={{ gap: "2px" }}>
          <StyledButton type="primary" onClick={handleOk}>
            Open BeKind
          </StyledButton>
          <StyledButton onClick={() => setIsModalOpen(false)}>
            Not Today
          </StyledButton>
        </CenterAlignedFlexboxCol>
      }
    />
  );
};

export default InstallModal;
