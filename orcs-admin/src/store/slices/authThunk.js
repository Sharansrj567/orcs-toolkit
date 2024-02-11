import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "../../utils/helper";
import api from "../../utils/api";
import history from "../../utils/history";
import jwt_decode from "jwt-decode";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = getToken();
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      let user = jwt_decode(accessToken);
      history.push("/");
      return { user, accessToken };
    } catch (e) {
      removeToken();
      return rejectWithValue("");
    }
  }
);

export const login = createAsyncThunk("auth/login", async (payload) => {
  const response = await api.post("auth/login", payload);
  console.log("Sharan", response);
  const Token = response.data.token;
  setToken(Token);
  let user = jwt_decode(Token);
  history.go("/");
  return { user, accessToken: Token };
});

export const signOut = createAsyncThunk("auth/logout", async () => {
  removeToken();
});
