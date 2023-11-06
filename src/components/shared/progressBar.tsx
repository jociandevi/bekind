import React, { useCallback, useEffect, useState } from "react";
import { variables } from "../../common/variables";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: ${variables.spacingXxxs};
  position: fixed;
  top: 0;
  z-index: 100;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${variables.pink3};
  transition: width 0.25s ease-out;
`;

const ProgressBar: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState("0%");

  const calculateWidth = useCallback(() => {
    const scrollDistance = window.scrollY;
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = (scrollDistance / totalHeight) * 100;
    return `${scrolledPercentage}%`;
  }, []);

  const handleScroll = useCallback(() => {
    setProgressWidth(calculateWidth());
  }, [calculateWidth]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Container>
      <Progress style={{ width: progressWidth }} />
    </Container>
  );
};

export default ProgressBar;
