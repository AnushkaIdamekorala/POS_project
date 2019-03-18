import React, { Component } from "react";
import NoEmailModal from "./components/NoEmailModal";
import { Link } from "react-router-dom";

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
      <div className="container">
        <div className="container madata">
          <NoEmailModal />
          <div className="d-flex justify-content-center h-100 ">
            <div className="cardd">
              <div className="card-header">
                <h3>Create an Account</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="email"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="password"
                      onChange={this.onChange}
                    />
                  </div>
                  <br />

                  <div className="form-group">
                    <input
                      type="submit"
                      value="Sign Up"
                      className="btn float-right login_btn"
                      onClick={this.onSubmit}
                    />
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-center links">
                  Need to go back?
                  <Link to="/login">
                    <font color="blue">Login</font>
                  </Link>
                </div>
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
