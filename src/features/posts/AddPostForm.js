import { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { userSelectAll } from "../users/UserSlice";
import { addNewPost} from "./PostSlice";
import { useNavigate } from "react-router-dom";
const AddPostsForm = () => {

const dispatch=useDispatch(); 
 const[title,setTitle]=useState('')
 const[content,setContent]=useState('')
const[userId,setUserId]=useState('') 
const users=useSelector(userSelectAll) 
const[addRequest,setRequest]=useState('idle') 

const navigate=useNavigate();
    const onTitleChange= e =>setTitle(e.target.value)
    const onContentChange =e =>setContent(e.target.value)
    const onAuthorChange =e =>setUserId(e.target.value)


    const cansave=[title,content,userId].every(Boolean) && addRequest ==='idle';

    const onSavePostClicked=()=>{
        if(cansave){
            try{
                setRequest('pending')
                dispatch(addNewPost({
                    title,body: content,userId}
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
    <h2>Add a New Post</h2>
    <form>
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
    </form>
   </section>
  )
}
export  default AddPostsForm;
