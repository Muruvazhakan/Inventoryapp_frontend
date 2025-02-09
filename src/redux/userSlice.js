import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userid: localStorage.getItem("invUser") ?? "",
    companyName: "",
    companyTagLine: "",
    companyAddress: "",
    companyPhno: "",
    companymailid: "",
    companyGstin: "",
    companyGstinStatename: "",
    companyOwner: "",
    companyImage: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
