import React from "react";
import { ImageContainer } from "../shared/sharedLayouts";
import styled from "styled-components";
import { lgBreakPoint } from "../../common/mediaQueryHook";
import { useSearchParams } from "react-router-dom";

const imageSrc =
  "https://images.unsplash.com/photo-1502519144081-acca18599776?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const videoSrc =
  "https://images.unsplash.com/photo-1502519144081-acca18599776?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const Image = styled.img`
  width: 100vw;
  height: ${100 / 1.618}vw;
  @media only screen and ${lgBreakPoint} {
    width: 50vw;
    height: 100vh;
  }
  border-radius: 0;
  object-fit: cover;
`;

export const Video = styled.video`
  width: 100vw;
  height: ${100 / 1.618}vw;
  @media only screen and ${lgBreakPoint} {
    width: 50vw;
    height: 100vh;
  }
  border-radius: 0;
  object-fit: cover;
`;

const JoinImageOrVideo: React.FC = () => {
  let [searchParams] = useSearchParams();
  const isVideo = searchParams.get("video") === "true";

  return (
    <ImageContainer style={{ margin: 0 }}>
      {isVideo ? (
        <Video>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
      ) : (
        <Image src={imageSrc} alt={`Join the movement`} />
      )}
    </ImageContainer>
  );
};

export default JoinImageOrVideo;
