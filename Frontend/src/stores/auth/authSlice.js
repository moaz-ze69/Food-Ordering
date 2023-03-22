import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, isAuthenticated: true, user: action.payload };
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const getUser = (state) => state.user;

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
