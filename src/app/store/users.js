import { createAction, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generetaAuthError } from "../utils/generateAuthError";
import randomInt from "../utils/getRandomInt";
const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      currentUser: JSON.parse(localStorageService.getCurrentUser()),
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload.currentUser._id;
      state.isLoggedIn = true;
      state.currentUser = action.payload.currentUser;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
      state.currentUser = null;
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestFailed,
  authRequestSuccess,
  userCreated,
  userLoggedOut,
  userUpdateSuccessed,
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed ");
const userUpdateFailed = createAction("users/userUpdateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");

export const login =
  ({ payload, redirect, navigate }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const {data , currentUser} = await authService.login({ email, password });
      dispatch(authRequestSuccess({currentUser}));
      localStorageService.setTokens(data , currentUser);
      navigate(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generetaAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp =
  ({ email, password, ...rest }, navigate) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data.currentUser._id);
      dispatch(authRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest,
          navigate,
        })
      );
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generetaAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const logOut = (navigate) => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  navigate("/");
};
function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.update(payload);
      dispatch(userCreated(content));
      payload.navigate("/");
    } catch (error) {
      dispatch(createUserFailed(error.message));
    }
  };
}

export const loadUsersList = (currentPage) => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const data = await userService.get(currentPage);
    dispatch(usersReceived(data));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};
export const updateUser = (newUserData, navigate) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(newUserData);
    dispatch(userUpdateSuccessed(content));
    if (navigate) navigate(`/users/${content._id}`);
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const getUsersList = () => (state) =>state.users.entities
export const getCurrentUserData = () => (state) =>state.users.currentUser

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;
export default usersReducer;
