export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const login = (user) => {
  return {
    type: LOGIN,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
