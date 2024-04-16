import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteApiBlog, singleBlogById } from "../reducers/BlogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./showAuthor";
import ReactionsButtons from "./ReactionsButtons";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const blog = useSelector((state) => singleBlogById(state, blogId));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (blog) {
      dispatch(deleteApiBlog(blog.id));
      navigate("/");
    }
  };
  if (!blog) {
    return (
      <section>
        <h2>پستی که دنبالش میگردی وجود نداره دوست من 🤗</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="blog">
        <h2>{blog.title}</h2>
        <div>
          <ShowTime timestamp={blog.date} />
          <ShowAuthor userId={blog.user} />
        </div>
        <p className="blog-content">{blog.content}</p>
        <ReactionsButtons blog={blog} />
        <Link to={`/editBlog/${blog.id}`} className="button">
          ویرایش پست
        </Link>
        <button
          className="button muted-button"
          style={{ marginRight: "10px" }}
          onClick={handleDelete}
        >
          حذف پست
        </button>
      </article>
    </section>
  );
};

export default SingleBlogPage;
