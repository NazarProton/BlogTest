import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../store/users";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => setOpen((prevState) => !prevState);
    if (!currentUser) return "Loading...";
    return (
      <div className="dropdown" onClick={toggleMenu}>
        <div className="btn dropdown-toggle d-flex align-items-center">
          <div className="me-2">{currentUser.name}</div>
          <img
            src={
              currentUser.avatar
                ? `http://test-blog-api.ficuslife.com/${currentUser.avatar}`
                : "https://thumbs.dreamstime.com/b/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E-%D1%81%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%BC%D0%B5%D0%B4%D0%B8%D0%B0-182145777.jpg"
            }
            alt=""
            height="40"
            className="img-responsive rounded-circle"
          />
        </div>
        <ul className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
          <Link to={`/users/${currentUser._id}`} className="dropdown-item">
            Profile
          </Link>
          <Link to="logout" className="dropdown-item">
            Logout
          </Link>
        </ul>
      </div>
    );
};

export default NavProfile;
