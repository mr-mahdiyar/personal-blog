import React, { useEffect, useState } from "react";
import { Outlet  } from "react-router-dom";
import NavBar from "../components/NavBar";

function MainLoyout() {
  return <>
  <NavBar />
    <Outlet />
  </>;
}

export default MainLoyout;
