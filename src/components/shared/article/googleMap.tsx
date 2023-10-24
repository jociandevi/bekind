import React from "react";

interface Props {
  text: string;
}

const GoogleMap: React.FC<Props> = ({ text }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapUrl = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${text}&zoom=8`;
  return (
    <iframe
      title={text}
      width="450"
      height="250"
      style={{ border: 0 }}
      src={mapUrl}
    ></iframe>
  );
};

export default GoogleMap;
