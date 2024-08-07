import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  role: localStorage.getItem("userRole") || null,
  accountId: localStorage.getItem("accountId") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.accountId = action.payload.accountId;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userRole", action.payload.role);
      localStorage.setItem("accountId", action.payload.accountId);
    },
    clearUser: (state) => {
      state.user = null;
      state.role = null;
      state.accountId = null;
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      localStorage.removeItem("accountId");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
