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

  componentWillReceiveProps(nextProp) {
    if (nextProp.auth.isAuthenticated) {
      nextProp.history.push("/");
    }
  }

  render() {
    document.body.style.backgroundImage =
      "url('https://cdn.asiatatler.com/asiatatler/i/hk/2019/01/11160759-seafood-selection-dinner_article_1499x1000.jpg')";
    return (
      <div className="container madata">
        <WarningModal />
        <div className="d-flex justify-content-center h-100 ">
          <div className="cardd">
            <div className="card-header">
              <h3>Sign In</h3>
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
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Login"
                    className="btn float-right login_btn"
                    onClick={this.onSubmit}
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?
                <Link to="/signup">
                  <font color="blue">SignUp</font>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
