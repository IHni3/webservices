import { SET_LOADER } from "./actions/ui";
import { LOGIN, LOGOUT } from "./actions/auth";
import { API_SUCCESS, API_ERROR } from "./actions/api";

import identityManagementApiInstance from "./identityManagementApiInstance";

import { Pbkdf2Hashing } from "./Hashing";

export default (
  state = {
    isAuthUser: !!localStorage.getItem("user_token"),
    //user: JSON.parse(localStorage.getItem("user_token")) || {},
    user: localStorage.getItem("user_token"),
    isLoading: false,
    error: { text: "" },
  },
  action
) => {
  switch (action.type) {
    case LOGIN: {
      const user = action.payload;
      const token = login(user);
      return { ...state, isAuthUser: token !== null, user: { token: token } };
    }

    case API_SUCCESS:
      //localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, isAuthUser: true, user: action.payload.user };
    case API_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    case LOGOUT:
      localStorage.removeItem("user_token");
      return { ...state, isAuthUser: false, user: {} };
    default:
      return state;
  }
};

async function login(user) {
  const hashing = new Pbkdf2Hashing();

  const request = {
    email: user.email,
    passwordHash: hashing.generateHash(user.password),
  };

  let token = null;

  await identityManagementApiInstance
    .userLoginPost(request)
    .then((response) => {
      response.json().then((data) => {
        localStorage.setItem("user_token", data.token);
        token = data.token;
      });
    });

  return token;
}
