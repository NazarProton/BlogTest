import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData} from "../store/users";
import NavBarItems from "./navBarItems";
import NavProfile from "./navProfile";

const Navbar = () => {
  const currentUser = useSelector(getCurrentUserData());
  return (
    
    <nav className="navbar bg-light mb-3 navSize">
      <div className="container-fluid">
        <NavBarItems currentUser={currentUser}/>
        <div className="d-flex">
          {currentUser ? (
            <NavProfile />
          ) : (
            <Link className="nav-link" aria-current="page" to="login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
