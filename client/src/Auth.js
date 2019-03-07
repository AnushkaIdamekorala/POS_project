import React, { Component } from "react";

import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
  FormGroup
} from "reactstrap";
import { loginUser } from "./actions/userActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Auth extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userDetail = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userDetail);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated === true) {
      this.props.history.push("/");
    }
  }

  render() {
    if (this.props.auth.isAuthenticated === true) {
      this.props.history.push("/");
      return null;
    } else {
      return (
        <div class="login-popup-wrap new_login_popup">
          <div class="login-popup-heading text-center">
            <h4>
              <i class="fa fa-lock" aria-hidden="true" /> Login{" "}
            </h4>
          </div>

          <Form onSubmit={this.onSubmit}>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="user_id"
                placeholder="e-mail / Mobile no"
                name="email"
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                name="password"
                onChange={this.onChange}
              />
            </div>
            <button
              type="submit"
              class="btn btn-default login-popup-btn"
              name="submit"
              value="1"
            >
              Login
            </button>
          </Form>

          <div class="text-center">
            Not registered yet?
            <a href="http://192.168.50.34/abcc/membership-application">
              click here
            </a>
          </div>
        </div>
      );
    }
  }
}

Auth.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Auth);
