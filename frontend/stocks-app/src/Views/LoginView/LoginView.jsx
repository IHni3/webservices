import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { LoginMenubar } from "../../Menubars/LoginMenubar";

import "./style.scss";

export const LoginView = ({ className, onSubmitted }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <header>
        <LoginMenubar />
      </header>

      <Card className={"login-card " + className}>
        <h1>Login</h1>
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
            feedback={false}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </span>
        <Link to="/register" id="register-link">
          <Button className="p-button-text" id="register" label="Register" />
        </Link>

        <Button
          id="login"
          label="Login"
          icon="pi pi-check"
          iconPos="right"
          onClick={(e) => onSubmitted(email, password)}
        />
      </Card>
    </div>
  );
};
