import React, { Component } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import { userRefresh } from "../actions/userActions";
import PropTypes from "prop-types";

class NoEmailModal extends Component {
  toggle = () => {
    this.props.userRefresh();
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.auth.isSignFail} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Invalid Email Try Again!
          </ModalHeader>
        </Modal>
      </div>
    );
  }
}

NoEmailModal.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { userRefresh }
)(NoEmailModal);
