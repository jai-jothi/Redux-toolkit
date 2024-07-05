import { parseISO,formatDistanceToNow } from "date-fns";


const Time = ({timestamp}) => {
    let timeago=''; 
    if(timestamp){
        const date=parseISO(timestamp) 
        const timeperiod=formatDistanceToNow(date) 

        timeago=`${timeperiod} ago`
    }
  return (
     <span title={timestamp}>
    &nbsp; <i>{timeago}</i>
     </span>
  )
}
export default Time;
