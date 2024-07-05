import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../features/posts/PostSlice'
import usersReducer from '../features/users/UserSlice'
export const store=configureStore({
    reducer:{
       posts:postReducer,
       user:usersReducer,
    }
})