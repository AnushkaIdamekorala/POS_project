import React, { Component } from "react";
import NoEmailModal from "./components/NoEmailModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

import { signupUser, userRefresh } from "./actions/userActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SignUp extends Component {
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
    this.props.signupUser(userDetail);
  };

  onWord = () => {
    this.props.history.push("/login");
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp.auth.isSignWell) {
      nextProp.userRefresh();
      nextProp.history.push("/login");
    }
  }

  render() {
    return (
      <div class="container madata">
        <NoEmailModal />
        <div class="d-flex justify-content-center h-100 ">
          <div class="cardd">
            <div class="card-header">
              <h3>Create an Account</h3>
            </div>
            <div class="card-body">
              <form>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    name="email"
                    placeholder="email"
                    onChange={this.onChange}
                  />
                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="password"
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div class="form-group">
                  <input
                    type="submit"
                    value="Sign Up"
                    class="btn float-right login_btn"
                    onClick={this.onSubmit}
                  />
                </div>
              </form>
            </div>
            <div class="card-footer">
              <div class="d-flex justify-content-center links">
                Need to go back?
                <a onClick={this.onWord}>
                  <font color="blue">Login</font>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SignUp.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { signupUser, userRefresh }
)(SignUp);
