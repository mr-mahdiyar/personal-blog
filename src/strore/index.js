import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/BlogSlice"
import usersReducer, { fetchUsers } from "../reducers/UserSlice"
export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        users: usersReducer
    }
})


store.dispatch(fetchUsers())