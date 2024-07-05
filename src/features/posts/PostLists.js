import { useSelector} from "react-redux";
import { selectsPostIds ,getPostError,getPostStatus} from "./PostSlice";//SelectAllPosts ithuku pathil ids vachi post yedukalam

import PostExpect from "./PostExpect";

const PostList =()=>{
const orderedPostsIds=useSelector(selectsPostIds) 
const postStatus=useSelector(getPostStatus);
const error=useSelector(getPostError)

//remove useeffect
let content;
if(postStatus==='loading'){
  content=<p>"Loading...."</p>

}
  else if(postStatus==='succeeded'){

 content=orderedPostsIds.map(postId =>
  <PostExpect  key={postId} postId={postId}/>
 )}
 else if(postStatus==='failed'){
  content=<p>{error}</p>
 }
return(
    <section>
        <h2>Posts</h2>
        {content}
        </section>
)

}
export default PostList;