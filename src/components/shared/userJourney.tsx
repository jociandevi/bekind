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
