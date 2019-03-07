import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signOutUser } from "../actions/userActions";
import PropTypes from "prop-types";

class NavbarNew extends Component {
  onLogout(e) {
    e.preventDefault();
  }

  onBackClick() {
    this.props.history.push("/");
  }

  onSignOutClick() {
    this.props.signOutUser();
    // this.props.history.push("/login");
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark oppo">
        <Link className="navbar-brand" to="/">
          {"     Your Point of Sale"}
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active " />
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active" />
            <li className="nav-item ">
              <button
                class="btn btn-outline-danger putha"
                type="button"
                onClick={this.onSignOutClick.bind(this)}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

NavbarNew.propTypes = {
  signOutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { signOutUser }
)(NavbarNew);
