import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/stats/">
      <Route exact path="/">
        <App />
      </Route>
      <Route>
        <Redirect to="" />
      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
