import { useSelector, useDispatch } from "react-redux";
import { DeleteApiUser, addNewUser, selectAllUsers } from "../reducers/UserSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
const UsersList = () => {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const [user, setUser] = useState("");
  const onUserChange = (event) => setUser(event.target.value);
  const canSave = Boolean(user);
  const handleSubmitForm = () => {
    if (canSave) {
      dispatch(addNewUser({id: nanoid(), fullName: user}));
      setUser("")
    }
  };
  const handleDelete = (userId) => {
    dispatch(DeleteApiUser(userId))
  }
  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.fullName}</Link>
      <Link style={{ paddingRight: "1rem", color: "red" }} onClick={() => handleDelete(user.id)}>&otimes;</Link>
    </li>
  ));
  return (
    <section>
      <div>
        <form autoComplete="off">
          <label htmlFor="userFullName">نام نویسنده</label>
          <input
            type="text"
            id="user"
            name="userFullName"
            value={user}
            onChange={onUserChange}
            autoComplete="off"
          />
          <button type="button" onClick={handleSubmitForm} disabled={!canSave}>
            ساخت نویسنده
          </button>
        </form>
      </div>
      <h2>لیست نویسندگان</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
};
export default UsersList;
