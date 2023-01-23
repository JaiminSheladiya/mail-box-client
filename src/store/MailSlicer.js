import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";
    const userEmail =
      localStorage.getItem("userEmail") || "jaimins365635@gmail.com";

const initialState = {
  allMails : []
};

export const fetchAllMails = createAsyncThunk('mail/fetchAllMails', async () => {
       const res = await axios.get(
         `https://react-http-8f419-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}.json`
         );
let s = []
        for (let key in res.data) {
          s.push({...res.data[key] , id : key})  
    }
    console.log(s)
    return s
})

export const deleteMail = createAsyncThunk('mail/deleteMail', async (id) => {
    console.log(id)
 await axios.delete(
   `https://react-http-8f419-default-rtdb.firebaseio.com/inbox/${
     userEmail.split("@")[0]
     }/${id}.json`)
     
      const res = await axios.get(
         `https://react-http-8f419-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}.json`
         );
let s = []
        for (let key in res.data) {
          s.push({...res.data[key] , id : key})  
    }
    console.log(s)
    return s
 
    
})



const mailSlice = createSlice({
    initialState: initialState,
    name: 'mail',
    reducers: {
        setMail(state, action) {
            state.allMails = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllMails.fulfilled, (state, action) => {
            state.allMails = action.payload
        })
        builder.addCase(deleteMail.fulfilled, (state,action) => {
            state.allMails = action.payload
        })
    }
})

export const mailActions = mailSlice.actions
export default mailSlice