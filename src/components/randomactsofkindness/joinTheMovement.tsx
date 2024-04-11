import React, { useState } from "react";
import { useMediaQueries } from "../../common/mediaQueryHook";
import SubscribeForm from "./subscribeForm";
import JoinImageOrVideo from "./joinImageOrVideo";
import AreYouSureToLeave from "./areYouSureToLeave";

const JoinTheMovement: React.FC = () => {
  const { lg } = useMediaQueries();
  const [showAreYouSureToLeave, setShowAreYouSureToLeave] = useState(false);

  const handleMouseLeave = () => {
    setShowAreYouSureToLeave(true);
  };

  return (
    <>
      <div
        onMouseLeave={handleMouseLeave}
        style={{
          display: "flex",
          alignItems: lg ? "center" : "inherit",
          flexDirection: lg ? "row" : "column",
        }}
      >
        <JoinImageOrVideo />
        <SubscribeForm lg={lg} />
      </div>
      {showAreYouSureToLeave && <AreYouSureToLeave />}
    </>
  );
};

export default JoinTheMovement;
