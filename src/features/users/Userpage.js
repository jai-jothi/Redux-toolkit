import React from 'react'
import { useSelector } from 'react-redux'
import { SelectPostByUser } from '../posts/PostSlice';
import { selectUserById } from './UserSlice';
import { Link, useParams } from 'react-router-dom';


const Userpage = () => {
    const {userId}=useParams()//user id yeduthura mudiyum url la kadasi id 
    const user=useSelector(state => selectUserById(state,Number(userId)))
    const postsforuser=useSelector(state =>{
       SelectPostByUser(state,Number(userId))//userid kidaikum apm selectpostbyuser pogum

    }
    )//user name irutha kammi solliya<h1>
    const postTitle=postsforuser.map(post =>(
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))
  return (
     <section>
        <h2>{user?.name}</h2>

        <ul>{postTitle}</ul>
     </section>
  )
}

export default Userpage