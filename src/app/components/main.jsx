import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../store/users";

const Main = () => {
    const currentUser = useSelector(getCurrentUserData());

  return (
    <div className="container mt-5">
      <div className="ms-3">
        <h1>Ficus Main Page</h1>
        <h3>Добро пожаловать {currentUser?currentUser.name:""}!</h3>
        <h3>У нас есть что почитать!</h3>
      </div>
      <Link className="nav-link" aria-current="page" to="posts">
        <h3>к постам!</h3>
      </Link>
    </div>
  );
};

export default Main;
