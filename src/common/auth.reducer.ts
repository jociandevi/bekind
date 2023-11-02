// auth.reducer.ts

export type AuthState = {
  token: string | null;
  userStreak: number;
  dailyIsDone: boolean;
  // ... other state properties
};

const initialState = {
  token: null,
  userStreak: 0,
  dailyIsDone: false,
  // ... other state properties
};

function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "CLEAR_TOKEN":
      return {
        ...state,
        token: null,
      };
    case "SET_USER_STREAK":
      return {
        ...state,
        userStreak: action.payload,
      };
    case "SET_DAILY_DONE":
      return {
        ...state,
        dailyIsDone: action.payload,
      };
    // ... other cases
    default:
      return state;
  }
}

export const setToken = (token: string) => ({
  type: "SET_TOKEN",
  payload: token,
});

export const removeToken = () => ({
  type: "CLEAR_TOKEN",
});

export const setUserStreak = (streak: number) => ({
  type: "SET_USER_STREAK",
  payload: streak,
});

export const setDailyDone = (isDone: boolean) => ({
  type: "SET_DAILY_DONE",
  payload: isDone,
});

export default authReducer;
