import { SET_LOADER } from "./actions/ui";
import { LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILED } from "./actions/auth";
import { API_SUCCESS, API_ERROR } from "./actions/api";

import identityManagementApiInstance from "./ApiInstances/identityManagementApiInstance";

import { BCrypt } from "./Hashing";

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

      state.loginFailed = false;

      login(user)
        .then((e) => {
          if (e !== null) {
            state.user = e;
            state.loginFailed = false;
            action.asyncDispatch({ type: LOGIN_SUCCESS });
          } else {
            state.error.text = "Invalid login credentials!";
            action.asyncDispatch({ type: LOGIN_FAILED });
          }
        })
        .catch((e) => {});

      /*if (token === null) {
        state.error = "Invalid login credentials!";
        return { ...state, isAuthUser: false, user: {} };
      } else {
        return { ...state, isAuthUser: true, user: { token: token } };
      }*/

      return { ...state, loggingIn: true };
    }
    case LOGIN_SUCCESS: {
      return { ...state, isAuthUser: true };
    }

    case LOGIN_FAILED: {
      console.log(LOGIN_FAILED, state);
      return {
        ...state,
        isAuthUser: false,
        loginFailed: true,
      };
    }

    case API_SUCCESS:
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
  const hashing = new BCrypt();

  const request = {
    email: user.email,
    passwordHash: hashing.generateHash(user.password),
  };

  let token = null;
  try {
    var obj = await identityManagementApiInstance.userLoginPost(request);
    if (obj.ok) {
      const data = await obj.json();
      const token = data.token;
      localStorage.setItem("user_token", token);
      return token;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}
