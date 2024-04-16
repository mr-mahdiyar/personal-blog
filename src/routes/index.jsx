import { createBrowserRouter } from "react-router-dom";
import MainLoyout from "../layout/MainLoyout";
import App from "../App";
import SingleBlogPage from "../components/SingleBlogPage";
import CreateBlogForm from "../components/CreateBlogForm";
import EditBlogFrom from "../components/EditBlogFrom";
import UsersList from "../components/UsersList";
import AuthorDetails from "../components/AuthorDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLoyout />,
    errorElement: <h3 className="text-center">چیزی پیدا نکردیم /:</h3>,

    // main elelment is MainLayout, then we need render other things with outlet.
    children: [
      {
        path: '/',
        element: <App />,
      },

      {
        path: "/blogs/:blogId",
        element: <SingleBlogPage />,
      },
      
      {
        path: "blogs/create-blog",
        element: <CreateBlogForm />,
      },
      {
        path: "/editBlog/:blogId",
        element: <EditBlogFrom />
      },
      {
        path: "/users",
        element: <UsersList />
      },
      {
        path: "/users/:userId",
        element: <AuthorDetails />
      }
    ],
  },
]);
