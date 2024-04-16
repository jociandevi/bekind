import React from "react";
import { ImageContainer } from "../shared/sharedLayouts";
import styled from "styled-components";
import { lgBreakPoint } from "../../common/mediaQueryHook";

const imageSrcDesktop =
  "https://d1rrsclargbwjh.cloudfront.net/Assets/optin-landing/Outbreak+Optin+Desktop.webp";
const imageSrcMobile =
  "https://d1rrsclargbwjh.cloudfront.net/Assets/optin-landing/Outbreak+Optin+Mobile.webp";

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

interface Props {
  lg?: boolean;
}

const JoinImageOrVideo: React.FC<Props> = ({ lg }) => {
  return (
    <ImageContainer style={{ margin: 0 }}>
      <Image
        src={lg ? imageSrcDesktop : imageSrcMobile}
        alt={`Join the movement`}
      />
    </ImageContainer>
  );
};

export default JoinImageOrVideo;
