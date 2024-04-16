import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
//import { sub } from "date-fns-jalali";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from "../services/blogServices";

const blogAdaptor = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = blogAdaptor.getInitialState({
  status: "idle",
  error: null,
});
// const initialState = {
//   blogs: [],
//   status: "idle",
//   error: null,
// };

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await getAllBlogs();
  return response.data;
});

export const addNewBlog = createAsyncThunk(
  "blogs/addNewBlog",
  async (initalBlog) => {
    const response = await createBlog(initalBlog);
    return response.data;
  }
);
export const deleteApiBlog = createAsyncThunk(
  "/blogs/deleteApiBlog",
  async (initialBlogId) => {
    await deleteBlog(initialBlogId);
    return initialBlogId;
  }
);
export const UpdateApiBlog = createAsyncThunk(
  "blogs/updateApiBlog",
  async (initalBlog) => {
    const response = await updateBlog(initalBlog, initalBlog.id);
    return response.data;
  }
);
const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {

    // blogAdded is a reducer:
    
    blogAdded: {
      reducer(state, action) {
        state.blogs.push(action.payload);
      },
      prepare(title, content, userId) {
        // complex logic
        return {
          payload: {
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
            },
          },
        };
      },
    },
    blogUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      //const existingBlog = state.blogs.find((blog) => blog.id === id);
      const existingBlog = state.entities[id];
      if (existingBlog) {
        existingBlog.title = title;
        existingBlog.content = content;
      }
    },
    blogDeleted: (state, action) => {
      const { id } = action.payload;
      state.blogs = state.blogs.filter((blog) => blog.id !== id);
    },
    reactionAdded: (state, action) => {
      const { blogId, reaction } = action.payload;
      const existingBLog = state.blogs.find((blog) => blog.id === blogId);

      if (existingBLog) {
        existingBLog.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "completed";

        // state.blogs = action.payload;
        blogAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })
      .addCase(addNewBlog.fulfilled, blogAdaptor.addOne
        // (state, action) => {
        // // state.blogs.push(action.payload);
        // blogAdaptor.addOne(action.payload);
      // }
      )
      .addCase(deleteApiBlog.fulfilled, blogAdaptor.removeOne
      //   (state, action) => {
      //   state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      //   // return use immer and update state
      // }
      )
      .addCase(UpdateApiBlog.fulfilled, blogAdaptor.updateOne
      //   (state, action) => {
      //   const { id } = action.payload;
      //   const indexOfBlog = state.blogs.findIndex((blog) => blog.id == id);
      //   state.blogs[indexOfBlog] = action.payload;
      // }
      );
  },
});

// export const selectAllBlogs = (state) => state.blogs.blogs;

// export const singleBlogById = (state, blogId) =>
//   state.blogs.blogs.find((blog) => blog.id === blogId);

export const {
  selectAll: selectAllBlogs,
  selectById: singleBlogById,
  selectIds: selectBlogIds,
} = blogAdaptor.getSelectors((state) => state.blogs);


export const selectAuthorBLogs = createSelector(
  [selectAllBlogs, (_, userId) => userId],
  (blogs, userId) => blogs.filter((blog) => blog.user === userId)
);

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } =
  blogsSlice.actions;

export default blogsSlice.reducer;
