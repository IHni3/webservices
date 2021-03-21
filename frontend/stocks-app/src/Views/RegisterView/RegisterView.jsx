import React, { useState } from "react";

import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { LoginMenubar } from "../../Menubars/LoginMenubar";


import "./style.scss";

export const RegisterView = ({ className, onSubmitted }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordrepeat, setPasswordrepeat] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function resetValidation() {
    document.getElementById("firstname-error").textContent = "";
    document.getElementById("lastname-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById("passwordrepeat-error").textContent = "";
    document.getElementById("email-error").textContent = "";

    document.getElementById("firstname").classList.remove("p-invalid");
    document.getElementById("lastname").classList.remove("p-invalid");
    document.getElementById("password").classList.remove("p-invalid");
    document.getElementById("passwordrepeat").classList.remove("p-invalid");
    document.getElementById("email").classList.remove("p-invalid");
  }

  return (
    <div>
      <header>
        <LoginMenubar />
      </header>

      <Card className={"register-card " + className}>
        <h1>Register</h1>
        <span className="p-float-label">
          <InputText
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label htmlFor="firstname">First name</label>
          <small id="firstname-error" className="p-error p-d-block" />
        </span>

        <span className="p-float-label">
          <InputText
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label htmlFor="lastname">Last name</label>
          <small id="lastname-error" className="p-error p-d-block" />
        </span>

        <span className="p-float-label">
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <small id="email-error" className="p-error p-d-block" />
        </span>

        <span className="p-float-label">
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <small id="password-error" className="p-error p-d-block" />
        </span>

        <span className="p-float-label">
          <Password
            id="passwordrepeat"
            value={passwordrepeat}
            feedback={false}
            onChange={(e) => setPasswordrepeat(e.target.value)}
          />
          <label htmlFor="passwordrepeat">Repeat</label>
          <small id="passwordrepeat-error" className="p-error p-d-block" />
        </span>

        <Button
          label="Submit"
          icon="pi pi-check"
          iconPos="right"
          onClick={() => {
            resetValidation();

            let invalid = false;
            if (firstname.length <= 0) {
              document.getElementById("firstname").classList.add("p-invalid");
              document.getElementById("firstname-error").textContent =
                "field is empty";
              invalid = true;
            }
            if (lastname.length <= 0) {
              document.getElementById("lastname").classList.add("p-invalid");
              document.getElementById("lastname-error").textContent =
                "field is empty";
              invalid = true;
            }
            if (password.length <= 0) {
              document.getElementById("password").classList.add("p-invalid");
              document.getElementById("password-error").textContent =
                "field is empty";
              invalid = true;
            }
            if (passwordrepeat.length <= 0) {
              document
                .getElementById("passwordrepeat")
                .classList.add("p-invalid");
              document.getElementById("passwordrepeat-error").textContent =
                "field is empty";
              invalid = true;
            }
            if (password !== passwordrepeat) {
              document
                .getElementById("passwordrepeat")
                .classList.add("p-invalid");
              document.getElementById("passwordrepeat-error").textContent =
                "passwords do not match";
              invalid = true;
            }
            if (!validateEmail(email)) {
              document.getElementById("email").classList.add("p-invalid");
              document.getElementById("email-error").textContent =
                "invalid email entered";
              invalid = true;
            }

            if (invalid == false) {
              onSubmitted(email, firstname, lastname, password);
            }
          }}
        />
      </Card>
    </div>
  );
};
