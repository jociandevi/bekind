// auth.reducer.ts

export type AuthState = {
  token: string | null;
  // ... other state properties
};

const initialState = {
  token: null,
  // ... other state properties
};

function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
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

export default authReducer;
