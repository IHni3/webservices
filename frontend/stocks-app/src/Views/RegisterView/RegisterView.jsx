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
        </span>

        <span className="p-float-label">
          <InputText
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label htmlFor="lastname">Last name</label>
        </span>

        <span className="p-float-label">
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </span>

        <span className="p-float-label">
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </span>

        <span className="p-float-label">
          <Password
            id="passwordrepeat"
            value={passwordrepeat}
            feedback={false}
            onChange={(e) => setPasswordrepeat(e.target.value)}
          />
          <label htmlFor="passwordrepeat">Repeat</label>
        </span>

        <Button
          label="Submit"
          icon="pi pi-check"
          iconPos="right"
          onClick={() => onSubmitted(email, firstname, lastname, password)}
        />
      </Card>
    </div>
  );
};
