import React from 'react'
import PostAuthor from "./PostAuthor";
import Time from "./Time";
import ReactionButtons from "./ReactionButtons";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SelectPostById} from './PostSlice';
//rafce
let PostExpect = ({postId}) => {

  const post=useSelector(state =>SelectPostById(state, postId)) 
  return (
    
    <article >

      <h3>{post.title}</h3>
    
      <p  className="excerpt">{post.body.substring(0, 75)}...</p>
    {/* <p>{(post.body).length <= 100?post.content:post.content.Slice(0,100)}</p> */}
   <p className="postCredit">
    <Link to={`post/${post.id}`}>View post</Link>
   <PostAuthor userId={post.userId}/>
   <Time timestamp={post.date}/>
   <ReactionButtons post={post}/>
   </p>
    </article>
  )
}
PostExpect=React.memo(PostExpect) //memo kula fun send prop change ana  matum tha fulla execute agum 
export default PostExpect