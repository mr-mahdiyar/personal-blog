import { useParams, Link } from "react-router-dom";
import { selectUserById } from "../reducers/UserSlice";
import { useSelector } from "react-redux";
import { selectAuthorBLogs } from "../reducers/BlogSlice";

const AuthorDetails = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));
  const userBlogs = useSelector((state) => selectAuthorBLogs(state, userId));

  
  const blogTitles = userBlogs.map((blog) => (
    <li key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user.fullName}</h2>
      <ul>
        {userBlogs.length > 0 ? (
          blogTitles
        ) : (
          <h3>کابر تا حالا پستی منتشر نکرده است.</h3>
        )}
      </ul>
    </section>
  );
};

export default AuthorDetails;
