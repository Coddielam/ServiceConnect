import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Loader from "./components/layout/Loader";

// redux
import { Provider } from "react-redux";
import store from "./store";

function App(alert) {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Loader />
        <Alert />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
