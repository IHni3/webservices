import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

export const AuthRoute = (props) => {
  const { isAuthUser, type } = props;

  if (type === "guest" && isAuthUser) return <Redirect to="/stocks" />;
  else if (type === "private" && !isAuthUser) return <Redirect to="/login" />;

  return <Route {...props} />;
};

const mapStateToProps = ({ isAuthUser }) => {
  return { isAuthUser };
};

export default connect(mapStateToProps)(AuthRoute);
