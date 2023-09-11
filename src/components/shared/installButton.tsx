import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useInstallPwaPrompt } from "../../common/useInstallPrompt";

const InstallButton: React.FC = () => {
  const [prompt, promptToInstall] = useInstallPwaPrompt();
  const [isVisible, setVisibleState] = useState(false);

  useEffect(() => {
    if (prompt) {
      setVisibleState(true);
    }
  }, [prompt]);

  if (!isVisible) {
    return null;
  }

  return (
    <Button icon={<DownloadOutlined />} onClick={promptToInstall}>
      Install
    </Button>
  );
};

export default InstallButton;
