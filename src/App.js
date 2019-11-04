import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MainRouteController from "./components/MainRouteController";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashboard" component={MainRouteController} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={MainRouteController} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
