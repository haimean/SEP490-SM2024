import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  role: localStorage.getItem('userRole') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('userRole', action.payload.role);
    },
    clearUser: (state) => {
      state.user = null;
      state.role = null;
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
