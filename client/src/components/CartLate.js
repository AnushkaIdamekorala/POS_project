import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getCart } from "../actions/cartActions";
import PropTypes from "prop-types";

import CartNavbar from "./CartNavbar";

class CartLate extends Component {
  componentDidMount() {
    this.props.getCart("5c6a4c226c7e0a0f2c7ea2fb");
  }

  onDeleteClick = id => {};

  render() {
    const { cartItems } = this.props.cart;
    return (
      <Container>
        <CartNavbar />
        <ListGroup>
          <TransitionGroup className="cart-list">
            {cartItems.map(({ _id, count, itm }) => (
              <div className="row row-margin-bottom">
                <div className=" no-padding lib-item" data-category="view">
                  <div className="lib-panel">
                    <div className="row box-shadow">
                      <div className="col-md-6">
                        <img
                          alt={itm.name}
                          className="img-responsive"
                          src="https://picsum.photos/120/80"
                          width={120}
                          height={100}
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="lib-row lib-header">
                          Example library
                          <div className="lib-header-seperator" />
                        </div>
                        <div className="lib-row lib-desc">
                          Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
                          Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

CartLate.propTypes = {
  getCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCart }
)(CartLate);
