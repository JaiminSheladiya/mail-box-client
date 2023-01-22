import { configureStore } from "@reduxjs/toolkit"; 
import authSlice from "./AuthSlicer";

// console.log(authSlice)

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
});

export default store