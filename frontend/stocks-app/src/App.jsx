import "./App.scss";
import PrimeReact from "primereact/api";

import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { SingleStockView } from "./Views/SingleStockView/SingleStockView";
import { Register } from "./Views/RegisterView/Register";
import Login from "./Views/LoginView/Login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Overview from "./Views/OverviewView/Overview";

import reducer from "./reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

import AuthRoute from "./AuthRoute";

function App() {
  PrimeReact.ripple = true;

  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <AuthRoute path="/stocks" type="private">
              <Overview />
            </AuthRoute>
            <AuthRoute
              path="/stock/:id"
              component={SingleStockView}
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
