import { useState } from "react";
import BlogsList from "./components/BlogsList";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <BlogsList />
    </>
  );
}

export default App;
