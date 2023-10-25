// types.ts

import { AuthState } from "./auth.reducer";

export type RootState = {
  authReducer: AuthState;
  // ... other reducer state types
};
