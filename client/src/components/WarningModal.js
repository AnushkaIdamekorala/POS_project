import React, { Component } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import { userRefresh } from "../actions/userActions";
import PropTypes from "prop-types";

class WarningModal extends Component {
  toggle = () => {
    this.props.userRefresh();
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.auth.isAuthFailed} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Authentication Failed</ModalHeader>
        </Modal>
      </div>
    );
  }
}

WarningModal.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { userRefresh }
)(WarningModal);
