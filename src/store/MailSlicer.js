import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";
import useFetch from "../customHooks/useFetch";
    const userEmail =
      localStorage.getItem("userEmail") || "jaimins365635@gmail.com";

const initialState = {
  allMails: [],
  sendedMail: [],
  allMailsCount: 0,
};

export const fetchAllMails = createAsyncThunk('mail/fetchAllMails', async () => {
       const res = await axios.get(
         `https://react-http-8f419-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}.json`
  );

let s = []
        for (let key in res.data) {
          s.push({...res.data[key] , id : key})  
    }
    return [s, s.length];
})

export const deleteMail = createAsyncThunk('mail/deleteMail', async (id) => {
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
    return [s,s.length]

    
})

export const fetchSendedMail = createAsyncThunk('mail/sendedMail', async () => {
         const res = await axios.get(
  "https://react-http-8f419-default-rtdb.firebaseio.com/inbox.json"
        );
        let s = []
        for (let name in res.data) {
            for(let key in res.data[name]){
                    if(res.data[name][key].senderMail== localStorage.getItem("userEmail") || 'jaimins365635')
                s.push({...res.data[name][key] , id : key , email : name+'@gmail.com'})
            }
    }

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
            state.allMails = action.payload[0]
            state.allMailsCount = action.payload[1]
        })
        builder.addCase(deleteMail.fulfilled, (state,action) => {
            state.allMails = action.payload[0]
            state.allMailsCount = action.payload[1];

        })
        builder.addCase(fetchSendedMail.fulfilled, (state, action) => {
          state.sendedMail = action.payload;
        });
    }
})

export const mailActions = mailSlice.actions
export default mailSlice