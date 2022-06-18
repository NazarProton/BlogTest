import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { select } from "redux-saga/effects";
import {
  LOAD_USERS,
  SEARCH_USERS,
  LOAD_POSTS,
} from "../store/redux/reducers/users/actions";
import {
  selectPosts,
  // selectSearchPosts,
} from "../store/redux/reducers/users/selectors";
import UsersTablePagination from "./usersTablePagination";

const PostListPage = () => {
  // const location = useLocation()
  const dispatch = useDispatch();
  let posts = useSelector(selectPosts);
  console.log(posts);
  let filteredPosts = useSelector(selectPosts);

  useEffect(() => {
    console.log("loadPosts");
    dispatch({
      type: LOAD_POSTS,
    });
  }, [dispatch]);

  const changePage = (newPage) => {
    dispatch({
      type: LOAD_USERS,
      payload: {
        limit: posts.limit,
        skip: newPage * 10,
      },
    });
  };
  const search = (e) => {
    dispatch({
      type: SEARCH_USERS,
      payload: {
        search: e.target.value,
        limit: 10,
        skip: 0,
      },
    });
  };

  // useEffect(() => {
  // }, []);
  // useEffect(() => {
  //   if (fetching) {
  //     axios
  //       .get(
  //         `http://test-blog-api.ficuslife.com/api/v1/posts?limit=15&skip=${currentPage}`
  //       )
  //       .then((res) => {
  //         setPosts([...posts, ...res.data.data]);
  //         setCurrentPage((prevState) => prevState + 15);;
  //       })
  //       .finally(() => setFetching(false));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fetching]);

  // useEffect(() => {
  //   document.addEventListener("scroll", scrollHandler);
  //   return function () {
  //     document.addEventListener("scroll", scrollHandler);
  //   };
  // }, []);

  // const scrollHandler = (e) => {
  //   if (
  //     e.target.documentElement.scrollHeight -
  //       (e.target.documentElement.scrollTop + window.innerHeight) <
  //     100
  //   ) {
  //     setFetching(true);
  //   }
  // };
  return (
    <>
      <form style={{ display: "inline-block" }}>
        <input type="text" placeholder="Search users..." onChange={search} />
      </form>
      {posts.loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="container py-4">
            <div className="row">
              {posts
                 ?posts.data?.map((post) => {
                    return (
                      <div
                        key={post._id}
                        className="col-10 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-2 mb-1"
                      >
                        <div className="card h-100 shadow rounded">
                          <h5 className="card-title m-1 mt-2 ms-2">
                            {post.title}
                          </h5>
                          <div className="bg-secondary post-pic"></div>
                          <div className="card-body">
                            <p className="card-text">{post.description}</p>
                            <p>
                              <i type="button" className="bi bi-heart"></i>
                              {post.description.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : filteredPosts.data.map((post) => {
                    return (
                      <div
                        key={post._id}
                        className="col-10 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-2 mb-1"
                      >
                        <div className="card h-100 shadow rounded">
                          <h5 className="card-title m-1 mt-2 ms-2">
                            {post.title}
                          </h5>
                          <div className="bg-secondary post-pic"></div>
                          <div className="card-body">
                            <p className="card-text">{post.description}</p>
                            <p>
                              <i type="button" className="bi bi-heart"></i>
                              {post.description.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <UsersTablePagination
            limit={posts.limit}
            skip={posts.skip}
            total={posts.total}
            onChange={changePage}
          />
        </>
      )}
    </>
  );
};

export default PostListPage;
