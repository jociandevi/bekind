import React, { useState } from "react";
import { useMediaQueries } from "../../common/mediaQueryHook";
import SubscribeForm from "./subscribeForm";
import JoinImageOrVideo from "./joinImageOrVideo";
import AreYouSureToLeave from "./areYouSureToLeave";
import { usePostApi } from "../../common/apiCalls";
import Loading from "../shared/loading";
import { facebookGroupUrl } from "../../common/util";

export interface SubscribeProps {
  email: string;
  notSubmitted?: boolean;
}

const JoinTheMovement: React.FC = () => {
  const { lg } = useMediaQueries();
  const [showAreYouSureToLeave, setShowAreYouSureToLeave] = useState(false);
  const { callPostApi, loading } = usePostApi("api/Member/Subscribe");
  const [success, setSuccess] = useState(false);
  const [unsubmittedEmail, setUnsubmittedEmail] = useState("");

  const handleMouseLeave = () => {
    setShowAreYouSureToLeave(true);
    if (unsubmittedEmail.length > 1) {
      submit({ email: unsubmittedEmail, notSubmitted: true }, false);
    }
  };

  const submit = (values: SubscribeProps, redirect: boolean = true) => {
    callPostApi(values).then((res) => {
      if (res?.status === 200 && redirect === true) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = facebookGroupUrl;
        }, 1000);
      }
    });
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
        <JoinImageOrVideo lg={lg} />
        {loading ? (
          <Loading />
        ) : (
          <SubscribeForm
            lg={lg}
            submit={submit}
            success={success}
            setUnsubmittedEmail={setUnsubmittedEmail}
          />
        )}
      </div>
      {showAreYouSureToLeave && (
        <AreYouSureToLeave submit={submit} success={success} />
      )}
    </>
  );
};

export default JoinTheMovement;
