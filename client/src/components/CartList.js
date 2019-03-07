import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
  getCart,
  deleteFromCart,
  updateCount,
  submitOrder
} from "../actions/cartActions";
import DetailNavbar from "./DetailNavbar";
import PropTypes from "prop-types";

import CartNavbar from "./CartNavbar";

class CartList extends Component {
  componentDidMount() {}

  componentWillMount() {
    this.props.getCart();
  }

  onDeleteClick = (id, name) => {
    this.props.deleteFromCart(id);
    document.getElementById(name).className = "";
  };

  onChange = e => {
    if (e.target.size < e.target.value) {
      e.target.title = "Qtyt";
    } else {
      e.target.title = "Qty";
      this.props.updateCount(e.target.id, e.target.value);
    }
  };

  onSubmit = () => {
    const { totalAmount } = this.props.cart;
    const { cartId } = this.props.cart;
    this.props.submitOrder(cartId, totalAmount);
  };

  render() {
    const { cartItems } = this.props.cart;

    return (
      <Container>
        <CartNavbar />
        <ListGroup>
          <TransitionGroup className="cart-list">
            {cartItems.map(({ _id, count, itm }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <div key={itm._id}>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-4 text-left">
                        <img
                          className="img-responsive"
                          src="https://picsum.photos/120/80"
                          alt={itm.name}
                          width={150}
                          height={100}
                        />
                      </div>
                      <div className="col-12 col-sm-12 col-md-8 text-left">
                        <div className="lib-row lib-header">
                          <div class="row">
                            <div class="col-sm-8">
                              <h3>
                                <strong>{itm.name}</strong>
                              </h3>
                            </div>
                            <div class="col-sm-2">
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-xs"
                              >
                                <i
                                  class="fa fa-align-justify fa-xs"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                            <div class="col-sm-2">
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-xs"
                                onClick={this.onDeleteClick.bind(
                                  this,
                                  _id,
                                  itm.name
                                )}
                              >
                                <i
                                  class="fas fa-trash fa-xs"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                          <div className="lib-header-seperator" />
                        </div>
                        <div class="row">
                          <div class="col-sm-5">
                            <h2>
                              <strong>
                                ${Number.parseFloat(itm.price).toFixed(2)}
                                <span className="text-muted" />
                              </strong>
                            </h2>
                          </div>
                          <div class="col-sm-1 text-right">
                            <h2>x</h2>
                          </div>
                          <div class="col-sm-3 text-right">
                            <input
                              id={_id}
                              type="number"
                              step={1}
                              defaultValue={count}
                              min={1}
                              title="Qty"
                              className="form-control form-control-lg"
                              borderColor="red"
                              size={itm.available}
                              onChange={this.onChange}
                            />
                          </div>
                          <div class="col-sm-3 ">
                            <div class="row text-right">up to</div>
                            <div class="row text-right"> {itm.available}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark oppo">
          <Link className="navbar-brand" to="/">
            Total Cost
          </Link>
          <span class="navbar-text">
            <h1>
              ${Number.parseFloat(this.props.cart.totalAmount).toFixed(2)}
            </h1>
          </span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active" />
              <li className="nav-item ">
                <button
                  class="btn btn-success putha"
                  type="button"
                  onClick={this.onSubmit}
                >
                  Order Now
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    );
  }
}

CartList.propTypes = {
  getCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCart, deleteFromCart, updateCount, submitOrder }
)(CartList);
