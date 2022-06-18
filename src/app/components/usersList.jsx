import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {getUsersList, loadUsersList } from "../store/users";
// getDataStatus
const UsersList = () => {
  const dispatch = useDispatch()
  // const dataStatus = useSelector(getDataStatus());
  const [someState, setSomeState] = useState(true)

  const [currentPage, setCurrentPage] = useState(0);
  if (someState&&currentPage===0) {
    dispatch(loadUsersList());
    setSomeState(false)
    setCurrentPage(10)
  };
  const [fetching, setFetching] = useState(false);
  // const [screenSize, setScreenSize] = useState();
  const users = useSelector(getUsersList());

  useEffect(() => {
    // resizeHandler();
    if (fetching) {
      setCurrentPage((prevState) => prevState + 10);    
      dispatch(loadUsersList(currentPage))

    }
      setFetching(false);
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetching]);
  
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    // window.addEventListener("resize", resizeHandler);
    return function () {
      document.addEventListener("scroll", scrollHandler);
      // window.addEventListener("resize", resizeHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) === 0
    ) {
      setFetching(true);
    }
  };
  // const resizeHandler = () => {
  //   const windowSize = window.innerWidth;
  //   if (windowSize > 768) setScreenSize(0);
  //   if (windowSize < 768) setScreenSize(1);
  //   if (windowSize < 500) setScreenSize(2);
  //   if (windowSize < 250) setScreenSize(4);

  // };
  return (
    <div className="container py-4">
      <div className="row">
        <>
          <ListGroup>
            {users &&
              users.map((u) => (
                <ListGroupItem key={u._id} className="m-1 shadow rounded">
                  <div className="d-flex">
                    <div className="d-flex littleStyle">
                      <div className="user_image">
                        {u.avatar ? (
                          <img
                            src={`http://test-blog-api.ficuslife.com/${u.avatar}`}
                            alt=""
                            className="user_image_img_svg"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-person user_image_img_svg"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path
                              fillRule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="col-2 ms-3 littleStylee">
                        <div>
                          <h5 className="ms-2">
                            {u.name && u.name.length > 20
                              ? ` ${u.name.slice(0, 20)}...`
                              : u.name
                              ? ` ${u.name}`
                              : " Unnamed"}
                          </h5>
                        </div>
                        <h6 className="ms-2">
                          Профессия:
                          {u.profession && u.profession.length > 10
                            ? ` ${u.profession.slice(0, 10)}...`
                            : u.profession
                            ? ` ${u.profession}`
                            : " unknown"}
                        </h6>
                      </div>
                      <i
                        className={
                          "me-1 bi bi-info-circle position-absolute top-50 end-0 translate-middle-y adaptstyleAntiThree"
                        }
                      ></i>
                    </div>
                    <div className="col-8 d-flex blockUsersListStyle">
                      <h6 className={"ms-2 col-2 adaptstyleThree"}>
                        skills:
                        {u.skills && u.skills.length > 10
                          ? ` ${u.skills.slice(0, 10)}...`
                          : u.skills
                          ? ` ${u.skills}`
                          : " unknown"}
                      </h6>
                      <h6 className={"ms-3 col-2 adaptStyleTwo"}>
                        details:
                        {u.details && u.details.length > 10
                          ? ` ${u.details.slice(0, 10)}...`
                          : u.details
                          ? ` ${u.details}`
                          : " unknown"}
                      </h6>
                      <h6 className={"ms-3 col-2 adaptStyleOne"}>
                        extra details:
                        {u.extra_details && u.extra_details.length > 10
                          ? ` ${u.extra_details.slice(0, 10)}...`
                          : u.extra_details
                          ? ` ${u.extra_details}`
                          : " unknown"}
                      </h6>

                      <i
                        className={
                          "me-3 mt-3 bi bi-info-circle col-1 top-50 end-0 translate-middle-y adaptstyleThree"
                        }
                      ></i>
                    </div>
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </>
      </div>
    </div>
  );
};

export default UsersList;
