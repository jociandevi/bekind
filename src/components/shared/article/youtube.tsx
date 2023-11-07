import React from "react";
import { useMediaQueries } from "../../../common/mediaQueryHook";

interface Props {
  src: string;
}

const Youtube: React.FC<Props> = ({ src }) => {
  const { md } = useMediaQueries();
  const width = md ? "560" : window.innerWidth * 0.9;
  const height = md ? "315" : (window.innerWidth * 0.9) / 1.7777;

  return (
    <iframe
      width={width}
      height={height}
      src={src}
      title="YouTube video player"
      style={{ border: 0 }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

export default Youtube;
