import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class NoPage extends Component {
  componentDidMount() {}

  render() {
    document.body.style.backgroundImage = "url('')";

    return (
      <div>
        <h1>{"No Page Found"}</h1>
      </div>
    );
  }
}

NoPage.propTypes = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(NoPage);
