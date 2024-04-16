import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addNewBlog, blogAdded } from "../reducers/BlogSlice";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../reducers/UserSlice";
function CreateBlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers)

  const onTitleChangeo = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value)

  const canSave = [title, content, userId].every(Boolean) 
  && requestStatus === "idle"
  const handleFormSubmit = async () => {
    if (canSave) {
      try {
        setRequestStatus("pending")
        await dispatch(addNewBlog(
          {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            }
          }
        ))
        setTitle("")
        setContent("")
        setUserId("")
        navigate("/")
      }
       catch (error) {
        console.error("Failed to save the blog")
      }
      finally {
        setRequestStatus("idle")
      }
    }
  };
  return (
    <div>
      <section>
        <h2>ساخت پست جدید</h2>
        <form autoComplete="off">
          <label htmlFor="blogTitle">عنوان پست</label>
          <input
            type="text"
            id="blogTitle"
            name="blogTitle"
            value={title}
            onChange={onTitleChangeo}
          />
          <label htmlFor="blogAuthor" />
          <select id="blogAuthor" value={userId} onChange={onAuthorChange}>
            <option value="">انتخاب نویسنده</option>
            {
              users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))
            }
          </select>
          <label htmlFor="blogContent">محتوای اصلی: </label>
          <textarea
            name="blogContent"
            id="blogContent"
            value={content}
            onChange={onContentChange}
          />
          <button type="button" onClick={handleFormSubmit} disabled= {!canSave}>
            ذخیره پست
          </button>
        </form>
      </section>
    </div>
  );
}

export default CreateBlogForm;
