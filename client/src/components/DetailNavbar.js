import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class DetailNavbar extends Component {
  onLogout(e) {
    e.preventDefault();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark oppo">
        <Link className="navbar-brand" to="/">
          Total Cost
        </Link>
        <span class="navbar-text">
          <h1>$345.00</h1>
        </span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active" />
            <li className="nav-item ">
              <button class="btn btn-success putha" type="button">
                Order Now
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default DetailNavbar;
