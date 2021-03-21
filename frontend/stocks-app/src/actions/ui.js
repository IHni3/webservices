export const SET_LOADER = "SET_LOADER";
export const MESSAGE = "MESSAGE";

export const setLoader = ({ state }) => ({
  type: SET_LOADER,
  payload: state,
});
export const showMessage = (message, severity) => {
  return {
    type: MESSAGE,
    payload: { message: message, severity: severity },
  };
};
