import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBarItems = ({ currentUser }) => {
        const [isOpen, setOpen] = useState(false);
        const toggleMenu = () => setOpen((prevState) => !prevState);
  return (
    <>
      <ul className="nav dropdownBigSize">
        <li className="nav-item d-flex">
          <Link className="nav-link" aria-current="page" to="main">
            Main
          </Link>

          {currentUser && (
            <div className="d-flex">
              <Link className="nav-link" aria-current="page" to="users">
                Users
              </Link>
              <Link className="nav-link" aria-current="page" to="posts">
                Posts
              </Link>
            </div>
          )}
        </li>
      </ul>

      <div className="dropdown dropdownLittleSize" onClick={toggleMenu}>
        <div className="btn dropdown-toggle d-flex align-items-center">
          <i className="bi bi-list"></i>
        </div>
        <ul className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
          <Link className="nav-link" aria-current="page" to="main">
            Main
          </Link>
          <Link className="nav-link" aria-current="page" to="users">
            Users
          </Link>
          <Link className="nav-link" aria-current="page" to="posts">
            Posts
          </Link>
        </ul>
      </div>
    </>
  );
};
 
export default NavBarItems;