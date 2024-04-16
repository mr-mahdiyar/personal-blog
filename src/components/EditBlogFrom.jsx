import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { UpdateApiBlog, singleBlogById } from "../reducers/BlogSlice";


const EditBlogFrom = () => {
    const {blogId} = useParams()
    const blog = useSelector(state => singleBlogById(state, blogId))

    const [title, setTitle] = useState(blog.title)
    const [content, setContent] = useState(blog.content)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const onTitleChangeo = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);
    const handleSubmitForm = () => {
        if(content && title) {
            dispatch(UpdateApiBlog({
              id: blogId,
              date: blog.date,
              title,
              content,
              user: blog.user,
              reactions: blog.reactions
            }))
            navigate(`/blogs/${blogId}`)
    }
  }
  return <div>
  <section>
    <h2>ویرایش پست</h2>
    <form autoComplete="off">
      <label htmlFor="blogTitle">عنوان پست</label>
      <input
        type="text"
        id="blogTitle"
        name="blogTitle"
        value={title}
        onChange={onTitleChangeo}
      />
      <label htmlFor="blogContent">محتوای اصلی: </label>
      <textarea
        name="blogContent"
        id="blogContent"
        value={content}
        onChange={onContentChange}
      />
      <button type="button" onClick={handleSubmitForm}>
        ویرایش پست
      </button>
    </form>
  </section>
</div>
}

export default EditBlogFrom;
