import React, { useEffect, useState } from "react";
import AntdModal from "./modal";
import DownloadImg from "../../img/inbox.png";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallModal: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      // Prevent the default browser install prompt
      event.preventDefault();

      // Stash the event so it can be triggered later.
      setDeferredPrompt(event);
      setIsModalOpen(true);
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
      title="Install the app"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onOk={handleOk}
      description="Get our free app. It won't take up space on your phone."
      imageUrl={DownloadImg}
      isProfileImage
      okText="Sure!"
      cancelText="Not today"
    />
  );
};

export default InstallModal;
