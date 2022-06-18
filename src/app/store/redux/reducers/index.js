import {combineReducers} from 'redux';
import usersReducer from '../../users';
// import {connectRouter} from 'connected-react-router';
// import { createBrowserHistory } from 'history';
import PostsReducer from "./users";

// export const history = createBrowserHistory({ window });

const initial = {};

export function appReducer(state = initial, action) {
    return state;
}

const rootReducer = combineReducers({
    app: appReducer,
    posts: PostsReducer,
    users: usersReducer
    // router: connectRouter(history),
})

export default rootReducer;