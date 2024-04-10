import { KindnessAction, KindnessHistory } from "./interfaces";

export const baseUrl = "https://bekind-api.azurewebsites.net";

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
  currentDate.setUTCHours(0, 0, 0, 0); // Normalize current date to the beginning of the day

  if (!history || history.length === 0) {
    return 0;
  }

  currentDate.setDate(currentDate.getDate() - 1);

  for (let i = 0; i < history.length; i++) {
    const taskDate = new Date(history[i].createdDate);
    taskDate.setUTCHours(0, 0, 0, 0);

    if (taskDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (taskDate > currentDate) {
      continue;
    } else {
      break;
    }
  }

  return streak;
};

export const isDailyDone = (lastAction: KindnessHistory) => {
  const dateOfLatest = new Date(lastAction?.createdDate);
  const today = new Date();
  if (dateOfLatest.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
    return true;
  } else {
    return false;
  }
};

export const shuffleArray = (array: KindnessAction[]) => {
  if (array === undefined || array.length === 0) {
    return array;
  }
  for (let i = array?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
