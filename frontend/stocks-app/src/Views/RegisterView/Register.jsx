import React, { useState } from "react";
import { RegisterView } from "./RegisterView";
import { RegisterProcess } from "./RegisterProcess";

export const Register = (props) => {
  const registerProcess = new RegisterProcess(props);

  return (
    <RegisterView
      className={"small-center-card"}
      onSubmitted={(email, firstname, lastname, password) =>
        registerProcess.onRegisterSubmitted(
          email,
          firstname,
          lastname,
          password
        )
      }
    ></RegisterView>
  );
};
