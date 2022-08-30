import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="menu bg-white-400 justify-around py-2 shadow-xl flex text-black text-lg uppercase font-bold justify-">
      <div className="justify-start">
        <img src="Group 1.svg" alt="dummy item" />
      </div>
      <div className="justify-start py-5">
        <NavLink className="px-5 py-5" to="/">
          Home
        </NavLink>

        <NavLink className="px-5 py-5" to="/signin">
          Signin
        </NavLink>
        <NavLink className="px-5 py-5" to="/signup">
          Signup
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
