import { white, pink3 } from "../../common/variables";

export const glowingStyle = `0 0 10px 5px ${white}, 0 0 20px 7px ${white}, 0 0 25px 20px ${pink3}`;

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
