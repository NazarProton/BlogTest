import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  SEARCH_USERS,
  SEARCH_USERS_FAILURE,
  SEARCH_USERS_SUCCESS,
} from "./actions";

const initialPeopleState = {
    limit:10,
    skip:0,
    total:0,
    loading:false,
    error:null,
    data:null
}

export default function PostsReducer(state = initialPeopleState, action) {
  switch (action.type) {
    case LOAD_POSTS: {
      // const { limit, skip, total } = action.payload;
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_POSTS_SUCCESS: {
      const { limit, skip, total } = action.payload.pagination;
      return {
        ...state,
        total,
        limit,
        skip,
        data: action.payload.data,
        loading: false,
      };
    }
    case LOAD_POSTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case SEARCH_USERS: {
      const { limit, skip, total, search } = action.payload;
      return {
        ...state,
        loading: true,
        limit,
        skip,
        total,
        search,
      };
    }
    case SEARCH_USERS_SUCCESS: {
      const { limit, skip, total } = action.payload.pagination;
      return {
        ...state,
        loading: false,
        total,
        limit,
        skip,
        data: action.payload.data,
      };
    }
    case SEARCH_USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}