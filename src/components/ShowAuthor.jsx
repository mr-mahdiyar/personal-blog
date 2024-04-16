import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../reducers/UserSlice";
const ShowAuthor = ( {userId} ) => {
    const author = useSelector(state => selectUserById(state, userId))
  return <>
  <span>
    توسط
    {author? ` ${author.fullName}` : " نویسنده ناشناس"}
  </span>
  </>;
}

export default ShowAuthor;
