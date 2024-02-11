import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, login, signOut } from "./authThunk";

const initialState = {
  token: null,
  authenticated: false,
  loading: false,
  userData: {},
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.authenticated = false;
      state.error = false;
      state.userData = {};
      state.token = null;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      const { accessToken, user } = action.payload;
      state.token = accessToken;
      state.authenticated = true;
      state.userData = user;
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [fetchUserData.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      console.log("Srjjjjjjjjjjauth", action);
      const { accessToken, user } = action.payload;
      state.token = accessToken;
      state.userData = user;
      state.loading = false;
      state.error = false;
      state.authenticated = true;
    },
    [fetchUserData.rejected]: (state, action) => {
      state.loading = false;
      state.userData = {};
      state.error = false;
      state.token = null;
      state.authenticated = false;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
