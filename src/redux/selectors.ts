import { RootState } from "../common/types";

export const selectUserStreak = (state: RootState) =>
  state.authReducer.userStreak;
export const selectDailyIsDone = (state: RootState) =>
  state.authReducer.dailyIsDone;