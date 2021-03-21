import React, { useRef } from "react";
import { RegisterView } from "./RegisterView";
import { BCrypt } from "../../Hashing";

import identityManagementApiInstance from "../../ApiInstances/identityManagementApiInstance";
import { Toast } from "primereact/toast";

export const Register = (props) => {
  const hashing = new BCrypt();
  const myToast = useRef(null);

  function showToast(severityValue, summaryValue, detailValue) {
    myToast.current.show({
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  }

  function onRegisterSubmitted(email, firstname, lastname, password) {
    const request = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      passwordHash: hashing.generateHash(password),
    };

    identityManagementApiInstance
      .userRegisterPost(request)
      .then((response) => {
        if (response.ok) {
          console.log("ok");
          window.location.href = "/login";
        } else {
          showToast("error", "Register", response.statusText);
        }
      })
      .catch((e) => {
        showToast("error", "Register", e.statusText);
      });
  }

  return (
    <div>
      <Toast ref={myToast} />
      <RegisterView
        className={"small-center-card"}
        onSubmitted={(email, firstname, lastname, password) =>
          onRegisterSubmitted(email, firstname, lastname, password)
        }
      ></RegisterView>
    </div>
  );
};
