import { createSlice } from "@reduxjs/toolkit";

import { fetchUser, createUser } from "../thunks/user";
import { LOCAL_STORE_KEYS } from "../../utils/constants";

const storeUserDetails = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};

export const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem(LOCAL_STORE_KEYS.user)) || {},
  reducers: {
    setUser: storeUserDetails,
    removeUser: () => {
      localStorage.removeItem(LOCAL_STORE_KEYS.user);
      return {};
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: storeUserDetails,
    [createUser.fulfilled]: storeUserDetails,
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
