
import { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { updatePost,deletePost, SelectPostById } from "./PostSlice";
import { useParams,useNavigate } from "react-router-dom";
import { userSelectAll } from "../users/UserSlice";
import React from 'react'

const Editpostform = () => {
    const {postId}=useParams();
    
    const posts=useSelector((state)=>SelectPostById(state,Number(postId)));

    const users=useSelector(userSelectAll);

    
   
 const[title,setTitle]=useState(posts?.title)
 const[content,setContent]=useState(posts?.body)
const[userId,setUserId]=useState(posts?.userId) 
const[addRequest,setRequest]=useState('idle') 
const dispatch=useDispatch(); 
const navigate=useNavigate();
if(!posts){
    return(
   <section>
    <h>Post not found!</h>
   </section>
    )
    
}

const onTitleChange= e =>setTitle(e.target.value)
const onContentChange =e =>setContent(e.target.value)
const onAuthorChange =e =>setUserId(Number(e.target.value))

const cansave=[title,content,userId].every(Boolean) && addRequest ==='idle';

const onSavePostClicked=()=>{
    if(cansave){
        try{
            setRequest('pending') 
            dispatch(updatePost({ id:posts.id,
                title,body: content,userId,reactions:posts.reactions})).unwrap() 
            setTitle('')
            setContent('')
            setUserId('')
            navigate(`/`)
        }
        catch(err){
            console.log('failed to save the post',err)
        }
        finally{
            setRequest('idle')
        }
    }
}
const onDeletepost=()=>{
    if(cansave){
        try{
            setRequest('pending') 
            dispatch(deletePost({ id:posts.id}
            )).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        }
        catch(err){
            console.log('failed to save the post',err)
        }
        finally{
            setRequest('idle')
        }
    }
}
const usersOptions =users.map(user => (
    <option key={user.id} value={user.id}>
        {user.name}
    </option>
))
  return (
   <section>
    <h2>Edit Post</h2>
    <from>
    <label htmlFor="postTitle">Post Title:</label>
        <input 
        type="text"
        id="postTitle"
        name="postTitle"
        value={title}
        onChange={onTitleChange}
        />

    
    <label htmlFor="postAuthor">Author</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
            <option value=''>

            </option>
            {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea 
        type="text"
        id="postContent"
        name="postContent"
        value={content}
        onChange={onContentChange}
        />
        <button type="button"
        onClick={onSavePostClicked}
        disabled={!cansave}>
            Save Post
        </button>
        <button className="deleteButton" type="button" onClick={onDeletepost}>
            Delete Post
        </button>
            </from>
   </section>
  )
  }

export default Editpostform

