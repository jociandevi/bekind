import { KindnessAction, KindnessHistory } from "./interfaces";

export const transformTitleToUrl = (title: string) => {
  let formattedString = title.toLowerCase();
  formattedString = formattedString
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
  return formattedString;
};

export const calculateStreak = (history: KindnessHistory[]) => {
  let streak = 0;
  let currentDate = new Date();

  if (history === undefined) {
    return;
  }

  for (let i = 0; i < history.length; i++) {
    const taskDate = new Date(history[i].createdDate);

    // Check if the taskDate is the same as currentDate or one day before
    if (
      taskDate.getUTCFullYear() === currentDate.getUTCFullYear() &&
      taskDate.getUTCMonth() === currentDate.getUTCMonth() &&
      taskDate.getUTCDate() === currentDate.getUTCDate()
    ) {
      streak++;
      // Subtract one day from currentDate
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break; // If there's a gap in dates, break out of the loop
    }
  }

  return streak;
};

export const getIsPickEnabled = (lastAction: KindnessHistory) => {
  const dateOfLatest = new Date(lastAction?.createdDate);
  const today = new Date();
  if (dateOfLatest.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
    return false;
  } else {
    return true;
  }
};

export const shuffleArray = (array: KindnessAction[]) => {
  for (let i = array?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
