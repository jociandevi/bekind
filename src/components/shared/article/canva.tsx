import Link from "antd/es/typography/Link";
import React from "react";
import { pink6, spacingS } from "../../../common/variables";

interface Props {
  canvaId: string;
}

const Canva: React.FC<Props> = ({ canvaId }) => {
  const src = `https://www.canva.com/design/${canvaId}/view?embed`;
  const canvaLink = `https://www.canva.com/design/${canvaId}/view?utm_content=${canvaId}&utm_campaign=designshare&utm_medium=embeds&utm_source=link`;

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingTop: "100.0000%",
          paddingBottom: 0,
          boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
          marginTop: "1.6em",
          marginBottom: "0.9em",
          overflow: "hidden",
          borderRadius: "8px",
          willChange: "transform",
        }}
      >
        <iframe
          title={canvaId}
          loading="lazy"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            border: "none",
            padding: 0,
            margin: 0,
          }}
          src={src}
          allow="fullscreen"
        ></iframe>
      </div>
      <Link
        href={canvaLink}
        style={{
          color: pink6,
          fontSize: "14px",
          marginBottom: spacingS,
        }}
        target="_blank"
      >
        Designed for you by Eva in Canva
      </Link>
    </>
  );
};

export default Canva;
