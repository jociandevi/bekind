import { variables } from "../../common/variables";

export const glowingStyle = `0 0 10px 5px ${variables.white}, 0 0 20px 7px ${variables.white}, 0 0 25px 20px ${variables.pink3}`;

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
