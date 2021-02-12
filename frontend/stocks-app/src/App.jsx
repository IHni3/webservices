import "./App.scss";
import PrimeReact from "primereact/api";

import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { SingleStockView } from "./Views/SingleStockView/SingleStockView";
import { RegisterView } from "./Views/RegisterView/RegisterView";
import { LoginView } from "./Views/LoginView/LoginView";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { OverviewView } from "./Views/OverviewView/OverviewView";

function App() {
  PrimeReact.ripple = true;

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginView className={"small-center-card"} />
          </Route>
          <Route path="/register">
            <RegisterView className={"small-center-card"} />
          </Route>
          <Route path="/stocks">
            <OverviewView />
          </Route>
          <Route path="/stock/:id" component={SingleStockView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
