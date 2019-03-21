import React, { Component } from "react";
import { connect } from "react-redux";

export default class Spinner extends Component {
  render() {
    return (
      <div class="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    );
  }
}
