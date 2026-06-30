import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";
import { User, Session } from "@supabase/supabase-js";

const initialState: UserState = {
  user: null,
  session: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User | null; session: Session | null }>,
    ) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.isAuthenticated = !!action.payload.user;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, clearError } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userReducer;
