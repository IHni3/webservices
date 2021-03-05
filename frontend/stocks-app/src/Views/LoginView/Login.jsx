import React, { useState, Dispatch } from "react";
import { connect } from "react-redux";

import { LoginView } from "./LoginView";

import { login } from "../../actions/auth";

export class Login extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <LoginView
        className={"small-center-card"}
        onSubmitted={(email, password) =>
          this.props.login({ email: email, password: password })
        }
        isAuthUser={this.props.isAuthUser}
      ></LoginView>
    );
  }
}

export default connect(({ isAuthUser }) => ({ isAuthUser }), { login })(Login);
