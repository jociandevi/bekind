import { RootState } from "../common/types";

export const selectUserStreak = (state: RootState) =>
  state.authReducer.userStreak;
export const selectDailyIsDone = (state: RootState) =>
  state.authReducer.dailyIsDone;
export const selectUser = (state: RootState) => state.authReducer.user;
export const selectToken = (state: RootState) => state.authReducer.token;
