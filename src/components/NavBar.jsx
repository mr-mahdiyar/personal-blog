import React from "react";
import {Link} from "react-router-dom"
function NavBar() {
  return (
    <nav>
      <section>
        <h1 className="text-center">وبلاگ ریداکسی</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to={"/"}>وبلاگ</Link>
            <Link to={"/users"}>نویسندگان</Link>
          </div>
        </div>
      </section>
    </nav>
  );
}

export default NavBar;
