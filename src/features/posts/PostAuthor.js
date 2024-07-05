import { useSelector } from "react-redux";
import { userSelectAll } from "../users/UserSlice";

const PostAuthor=({userId})=>{
const users=useSelector(userSelectAll);
const author=users.find(user => user.id === userId) 
return(
    <span>by {author ?author.name:'unknoun author'}</span>
)
}
export default PostAuthor;