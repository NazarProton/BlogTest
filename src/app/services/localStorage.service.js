const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const currentUserData = "current-user"

export function setTokens(
    data,
    currentUser,
    expiresIn = 3600,

) {
    console.log(currentUser);
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, currentUser._id);
    localStorage.setItem(TOKEN_KEY, data);
    localStorage.setItem(REFRESH_KEY, data);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    localStorage.setItem(currentUserData, JSON.stringify(currentUser));
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getCurrentUser() {
  return localStorage.getItem(currentUserData);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}
export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(currentUserData);
}
export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
  getCurrentUser,
};

export default localStorageService;
