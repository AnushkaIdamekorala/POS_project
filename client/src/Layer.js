// App.js

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
//import jwt_decode from "jwt-decode";
//import setAuthToken from "./setAuthToken";
// import { setCurrentUser, logoutUser } from './actions/authentication';

import SignUp from "./SignUp";
import Login from "./Login";
import App from "./App";
import Home from "./Home";

import "bootstrap/dist/css/bootstrap.min.css";

class Layer extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/table" component={App} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </div>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default Layer;
