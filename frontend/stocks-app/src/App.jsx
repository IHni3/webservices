import "./App.scss";
import PrimeReact from "primereact/api";

import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { SingleStock } from "./Views/SingleStockView/SingleStock";
import { Register } from "./Views/RegisterView/Register";
import Login from "./Views/LoginView/Login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Overview from "./Views/OverviewView/Overview";

import React, { useRef } from "react";
import reducer from "./reducer";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import asyncDispatchMiddleware from "./asyncDispatchMiddleware";

import AuthRoute from "./AuthRoute";

import { Search } from "./Views/SearchView/Search.jsx";

function App() {
  PrimeReact.ripple = true;

  const store = createStore(reducer, applyMiddleware(asyncDispatchMiddleware));

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <AuthRoute path="/stocks" type="private">
              <Overview />
            </AuthRoute>
            <AuthRoute path="/search" type="private">
              <Search />
            </AuthRoute>
            <AuthRoute
              path="/stock/:id"
              component={SingleStock}
              type="private"
            />
            <AuthRoute path="/login" type="guest">
              <Login />
            </AuthRoute>
            <AuthRoute path="/register" type="guest">
              <Register />
            </AuthRoute>
            <Route>
              <Redirect to="/login" />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
