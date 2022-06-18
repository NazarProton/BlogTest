/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
// import { LOCATION_CHANGE } from "connected-react-router";
// import { useLocation } from "react-router-dom";
import {call, put, takeEvery , take, select, fork, join} from "redux-saga/effects"
import {
  LOAD_POSTS,
  LOAD_POSTS_FAILURE,
  //   LOAD_USERS,
  LOAD_POSTS_SUCCESS,
  SEARCH_USERS_SUCCESS,
} from "../reducers/users/actions";
// import { selectPosts } from "../reducers/users/selectors";

// let params = useLocation()
// console.log(params);

export  function* loadPostsList () {
    const request = yield call (axios.get , (`http://test-blog-api.ficuslife.com/api/v1/posts`))
        yield put({
        type:LOAD_POSTS,
        payload:request.data
    })
    try {
    yield put ({
        type:LOAD_POSTS_SUCCESS,
        payload:request.data
    })
} catch (error) {
    yield put ({
        type:LOAD_POSTS_FAILURE,
    })
}
};

export  function* loadUsersList ({payload}) {   
    const {limit,skip} = payload
    const request = yield call (axios.get , (`http://test-blog-api.ficuslife.com/api/v1/posts?limit=${limit}&skip=${skip}`))
    yield put({
        type:LOAD_POSTS_SUCCESS,
        payload:request.data
    })
};
export  function* searchUsers ({payload}) { 
    const {limit,skip,search} = payload
    console.log(limit, skip, search);
    const request = yield call (axios.get , (`http://test-blog-api.ficuslife.com/api/v1/posts?search=${search}&limit=${!search?10:limit}&skip=${!search?0:skip}`))
    yield put({
        type:SEARCH_USERS_SUCCESS,
        payload:request.data
    })
};

// export function* loadUserOnRouteEnter(){
//     while (true) {
//         const action = yield take(useLocation)
//         if(action.payload.location.pathname === "/posts"){
//         const {limit,skip,total} = state
//         yield put({
//             type:LOAD_USERS,
//             payload:{
//                 limit,skip,total
//             }

//         })}
//     }
// }

export default  function* usersSaga () {
   yield fork(loadPostsList)
    // yield takeEvery("LOAD_POSTS", loadUsersList);
    // yield takeEvery("SEARCH_USERS", searchUsers);
};
