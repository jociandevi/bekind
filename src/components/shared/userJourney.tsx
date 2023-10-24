import styled from "styled-components";
import { variables } from "../../common/variables";
import { Button } from "antd";

const glowingStyle = `0 0 10px 5px ${variables.white}, 0 0 20px 7px ${variables.white}, 0 0 25px 20px ${variables.pink3}`;

export const GlowingButton = styled(Button)<{ isGlowing?: boolean }>`
  box-shadow: ${(props) => (props.isGlowing ? glowingStyle : undefined)};
`;

export const showUserJourney = () => {
  const hasSeenTour = localStorage.getItem("hasSeenTour");

  if (!hasSeenTour) {
    return true;
  } else {
    return false;
  }
};

export const completeUserJourney = () => {
  localStorage.setItem("hasSeenTour", "true");
};

// steps of user journey:
// 1. pick button
// 2. click on card
