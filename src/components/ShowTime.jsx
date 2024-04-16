import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns-jalali";
function ShowTime( {timestamp}) {
    // console.log(timestamp);
    let timeAgo = ""
    if (timestamp)
    {
        const date = parseISO(timestamp)
        // console.log(date);
        const time = formatDistanceToNow(date)
        timeAgo = `${time} قبل`
    }
  return <span>
    <i>{timeAgo}</i> &nbsp;
  </span>;
}

export default ShowTime;
