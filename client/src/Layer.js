// App.js

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
//import jwt_decode from "jwt-decode";
//import setAuthToken from "./setAuthToken";
// import { setCurrentUser, logoutUser } from './actions/authentication';

import SignUp from "./SignUp";
import Login from "./Login";
import App from "./App";
import Home from "./Home";
import NoPage from "./NoPage";

import "bootstrap/dist/css/bootstrap.min.css";

class Layer extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/table" component={App} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default Layer;
