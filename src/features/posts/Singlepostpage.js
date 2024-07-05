
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { SelectPostById } from './PostSlice';
import PostAuthor from "./PostAuthor";
import Time from "./Time";
import ReactionButtons from "./ReactionButtons";

const Singlepostpage = () => {

    const { postId }=useParams()
    const posts=useSelector((state)=>SelectPostById(state,Number(postId)));

   if(!posts){
        return(
       <section>
        <h>Post not found!</h>
       </section>
        )
        
    }
   return (
    <article >
    <h3>{posts.title}</h3> 
  
     <p>{posts.body}</p> 
 
 <p className="postCredit">
  <Link to={`/post/Edit/${posts.id}`}>Edit page</Link>
 <PostAuthor userId={posts.userId}/>
 <Time timestamp={posts.date}/>
 <ReactionButtons post={posts}/>
 </p>
  </article>
  )
}

export default Singlepostpage