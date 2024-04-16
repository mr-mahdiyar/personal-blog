import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { getAllUsers, deleteUser, createUser } from "../services/blogServices";


const userAdaptor = createEntityAdapter()
const initialState = userAdaptor.getInitialState()
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  
  const response = await getAllUsers();
  return response.data;
});

export const DeleteApiUser = createAsyncThunk("/users/DeleteApiUser", async initialUserId => {
  await deleteUser(initialUserId)
  return initialUserId
})

export const addNewUser = createAsyncThunk("/users/addNewUser", async initialUser => {
  const response = await createUser(initialUser)
  return response.data
})


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchUsers.fulfilled, userAdaptor.setAll)
    .addCase(addNewUser.fulfilled, userAdaptor.addOne)
    .addCase(DeleteApiUser.fulfilled, userAdaptor.removeOne)
  },
});

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = userAdaptor.getSelectors(state => state.users)
// export const selectAllUsers = state => state.users;
// export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)

export default usersSlice.reducer;
