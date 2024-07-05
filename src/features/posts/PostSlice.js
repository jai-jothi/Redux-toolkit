import { createSlice,createAsyncThunk, createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import {sub} from "date-fns";
import axios from "axios";

 const POSTS_URL='https://jsonplaceholder.typicode.com/posts';

 const postAdapter= createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState=postAdapter.getInitialState({ 
    status:'idle',
    error:null,
    count:0
})
//read
export const fetchPosts=createAsyncThunk('posts/fetchPosts',async ()=>{
    
    const response=await axios.get(POSTS_URL)
    return response.data 

})
//create
export const addNewPost=createAsyncThunk('posts/addNewPost',async(initialPost)=>{
    
    const response=await axios.post(POSTS_URL,initialPost)
    return response.data
})
//update
export const updatePost=createAsyncThunk('posts/updatePost',async(initialPost)=>{
    const {id}=initialPost;
    try{
        const response=await axios.put(`${POSTS_URL}/${id}`,initialPost)
        return response.data
    }
    catch(err){
        return initialPost;//tdy start 1,initialpost thaga 
    }
   
})
//delete
export const deletePost=createAsyncThunk('posts/deletePost',async(initialPost)=>{
    const {id}=initialPost;
    try{
        const response=await axios.delete(`${POSTS_URL}/${id}`)
        if(response?.status===200)//ugly error ku mathil recent error ah katta
        return initialPost;
    return `${response?.status}:${response?.statusText}`;
    }
    catch(err){
        return err.message;
    }
   
})
const postSlice=createSlice({
    name:'posts',
    initialState,
    reducers:{
   //postadded function use pannala so atha delete pannidalam 
reactionAdded(state,action){
    const{postId,reaction} =action.payload;
     const existingPost=state.entities[postId]//array oru entites unq id iruku match agara entitis irukum
      
     if(existingPost){
        existingPost.reactions[reaction]++;
     }
    },
    increasecount(state,action){
          state.count=state.count + 1;
    }
    },
    extraReducers(builder){
        builder 
        .addCase(fetchPosts.pending, (state,action)=>{
  state.status='loading....'
        })
        .addCase(fetchPosts.fulfilled, (state,action)=>{
            
            state.status='succeeded';

            let min=1;
            const loadedeposts=action.payload.map(post =>{
                post.date=sub(new Date(),{ minutes: min++}).toISOString();
                post.reactions={
                    thumbsup: 0, 
                    wow:0,
                    heart:0,
                    rocket:0,
                    coffee:0
                }
                return post;
            });
         postAdapter.upsertMany(state, loadedeposts)//array kula insert pandrom na upsertmany used
            
            
        })
        .addCase(fetchPosts.rejected, (state,action)=>{
            state.status='failed'
            state.error=action.error.message
        })
        .addCase(addNewPost.fulfilled,(state,action)=>{
            const sorted=state.posts.sort((a, b) => {
                if(a.id > b.id) return 1;
                if(a.id < b.id) return -1;
                return 0;
             })
           
            action.payload.id=sorted[sorted.length-1].id + 1;
            action.payload.userId=Number(action.payload.userId)
            action.payload.date=new Date().toISOString();
            action.payload.reactions={
                thumbsup:0, 
                wow:0,
                heart:0,
                rocket:0,
                coffee:0
            }
            
            postAdapter.addOne(state, action.payload)//oru post add panna addone
        })
        .addCase(updatePost.fulfilled,(state,action) =>{ 
            if(!action.payload?.id){
                console.log('update could not complete') 
                console.log(action.payload)
                return;
            }
            //remove
            action.payload.date=new Date().toISOString();
           //remove 
   postAdapter.upsertOne(state, action.payload)//oru post matum update pandrom
        })
        .addCase(deletePost.fulfilled,(state,action) =>{ 
            if(!action.payload?.id){
                console.log('Delete could not complete') 
                console.log(action.payload)
                return;
            }
           
            const {id}=action.payload; 
           postAdapter.removeOne(state,id) //delete one 
    })
    }
    }
)
//getselector crete these selectors and we rename them with aliases using destructing

export const {
    selectAll:SelectAllPosts,
    selectById: SelectPostById,
    selectIds:selectsPostIds //return the state.ids
 //pass in selector that returns the posts slice of state
}=postAdapter.getSelectors(state =>state.posts)

// export const SelectAllPosts=(state)=>state.posts.posts; 
export const getPostStatus=(state)=>state.posts.status;
export const getPostError=(state)=>state.posts.error;
export const getcount=(state)=>state.posts.count;
// export const SelectPostById=(state, postid)=>
//   state.posts.posts.find(post => post.id === postid) 

export const {increasecount,reactionAdded}=postSlice.actions

export const SelectPostByUser=createSelector(
    [SelectAllPosts,(state,userId)=>userId],
    (posts,userId)=>posts.filter(post=>post.userId ===userId)//post userid marichina filter work agum
) //ithu tha memocision selector,array oda input parameter yeduthum[function tha vaikalam,dependency],parametet ah pass pannitu operation write pannalam
export default postSlice.reducer
