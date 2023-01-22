import { configureStore } from "@reduxjs/toolkit"; 
import authSlice from "./AuthSlicer";
import mailSlice from "./MailSlicer";

// console.log(authSlice)

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mail : mailSlice.reducer
  },
});

export default store