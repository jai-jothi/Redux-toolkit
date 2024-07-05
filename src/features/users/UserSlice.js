import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const POSTUSER='https://jsonplaceholder.typicode.com/users';

const initialState =[]

export const fetchUsers=createAsyncThunk('users/fetchUsers',async ()=>{
    
    const response=await axios.get(POSTUSER)
    return response.data

})
 const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{},
 extraReducers(builder){
            builder.addCase(fetchUsers.fulfilled,(state,action)=>{
                 return action.payload;
            })
        }
    },
    
 )
 export const userSelectAll=(state)=>state.user;
 export const selectUserById=(state,userId) =>
    state.user.find(user =>user.id===userId) //particular post match pannitu statela post id match agutho atha yethu vaa //user ak kattuga
 export default UserSlice.reducer;