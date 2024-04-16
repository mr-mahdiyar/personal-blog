import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchBlogs, selectAllBlogs } from "../reducers/BlogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./showAuthor";
import ReactionsButtons from "./ReactionsButtons";
import Spinner from "./Spinner";

const Blogs = ({ blogs }) => {
  const orderedBlogs = blogs
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {orderedBlogs.map((blog) => (
        <article className="blog-excerpt" key={blog.id}>
          <h3>{ blog.title}</h3>
          <div style={{ marginTop: "0.5rem" }}>
            <ShowTime timestamp={blog.date} />
            <ShowAuthor userId={blog.user} />
          </div>
          <p className="blog-content">{blog.content.substring(0, 100)}</p>
          <ReactionsButtons blog={blog} />
          <Link to={`/blogs/${blog.id}`} className="button muted-button">
            مشاهده کامل پست
          </Link>
        </article>
      ))}
    </>
  );
};
function BlogsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector(selectAllBlogs);
  const blogStatus = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  let content;

  if (blogStatus === "loading") {
    content = <Spinner text="در حال بارگذاری..." />;
  } else if (blogStatus === "completed") {
    content = <Blogs blogs = {blogs} />
  } else if (blogStatus === "failed") {
    content = <div className="">{error}</div>;
  }

  return (
    <div>
      <button
        className="full-button accent-button"
        style={{ marginTop: "1em" }}
        onClick={() => navigate("/blogs/create-blog")}
      >
        ساخت پست جدید
      </button>
      <section className="blog-list">
        <h2>تمامی پست ها</h2>
        {content}
      </section>
    </div>
  );
}

export default BlogsList;
