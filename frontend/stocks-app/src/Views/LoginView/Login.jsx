import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import { LoginView } from "./LoginView";

import { login } from "../../actions/auth";

import { Toast } from "primereact/toast";

export function Login(props) {
  const myToast = useRef(null);

  console.log(props);

  useEffect(() => {
    if (props.loginFailed === true)
      showToast("error", "Login", props.error.text);
  }, [props.loginFailed]);

  function showToast(severityValue, summaryValue, detailValue) {
    myToast.current.show({
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  }

  return (
    <div>
      <Toast ref={myToast} />
      <LoginView
        className={"small-center-card"}
        onSubmitted={(email, password) => {
          props.login({ email: email, password: password });
        }}
        isAuthUser={props.isAuthUser}
      ></LoginView>
    </div>
  );
}

const mapStateToProps = ({ isAuthUser, loginFailed, error }) => ({
  isAuthUser,
  loginFailed,
  error,
});

export default connect(mapStateToProps, {
  login,
})(Login);
