import { useDispatch } from "react-redux";
import { reactionAdded } from "./PostSlice";
const reactionEmoji={
    thumbsup:'👍', 
    wow:'🤑',
    heart:'❤️',
    rocket:'🚀',
    coffee:'☕'
}

const ReactionButtons = ({post}) => {
const dispatch=useDispatch()
   
    const reactionEmojibutton= Object.entries(reactionEmoji).map(([name,emoji])=>
        {
            return(
                <button
                 key={name}
                 type="button"
                 className="reactionButton"
                 onClick={()=>
                    dispatch(reactionAdded({postId:post.id,
                        reaction:name
                    }))
                 }
                >
                {emoji} {post.reactions[name]}
                </button>
            )

    }) 

  return (
    <div>{reactionEmojibutton}</div>
  )
}
export default ReactionButtons;
