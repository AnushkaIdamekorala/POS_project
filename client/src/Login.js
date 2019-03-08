import React, { Component } from "react";
import WarningModal from "./components/WarningModal";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

import { loginUser, userCarts } from "./actions/userActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Login extends Component {
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

  onWord = () => {
    this.props.history.push("");
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
      document.body.style.backgroundImage =
        "url('https://image.shutterstock.com/image-photo/cheerful-mature-women-enjoying-funny-260nw-640975693.jpg')";
      return (
        <div class="container madata">
          <WarningModal />
          <div class="d-flex justify-content-center h-100 ">
            <div class="cardd">
              <div class="card-header">
                <h3>Sign In</h3>
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
                  <div class="row align-items-center remember">
                    <input type="checkbox" />
                    Remember Me
                  </div>
                  <div class="form-group">
                    <input
                      type="submit"
                      value="Login"
                      class="btn float-right login_btn"
                      onClick={this.onSubmit}
                    />
                  </div>
                </form>
              </div>
              <div class="card-footer">
                <div class="d-flex justify-content-center links">
                  Don't have an account?
                  <Link to="/signup">
                    <font color="blue">Login</font>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser, userCarts }
)(Login);
