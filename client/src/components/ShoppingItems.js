import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { Transition, TransitionGroup } from "react-transition-group";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { addToCart } from "../actions/cartActions";

import PropTypes from "prop-types";

class ShoppingItems extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  onAddClick = (id, name) => {
    let count = parseInt(document.getElementById(id).value, 10);
    this.props.addToCart(id, count);
    document.getElementById(name).className = "disabled";
  };

  render() {
    const { items } = this.props.item;
    const { cartItems } = this.props.cart;
    var cartUnwraps = cartItems.map(i => {
      return i.itm;
    });
    var mari = function(a, b) {
      if (
        a
          .filter(i => {
            return b === i._id;
          })
          .toString()
      ) {
        return "disabled";
      } else {
        return "";
      }
    };

    return (
      <React.Fragment>
        <div className="containerer">
          <div className="card shopping-cart">
            <div className="card-header bg-dark text-light">
              <span> </span>
              Here is what we got!!!
              <div className="clearfix" />
            </div>
            <div className="card-body">
              {/* PRODUCT */}
              {items.map(it => (
                <div
                  key={it._id}
                  id={it.name}
                  className={mari(cartUnwraps, it._id)}
                >
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 text-center">
                      <img
                        className="img-responsive"
                        src="https://picsum.photos/120/80"
                        alt={it.name}
                        width={120}
                        height={80}
                      />
                    </div>
                    <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                      <h4 className="product-name">
                        <strong>{it.name}</strong>
                      </h4>
                      <h4>
                        <small>{it.description}</small>
                      </h4>
                    </div>

                    <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                      <div
                        className="col-6 col-sm-6 col-md-6 text-md-right"
                        style={{ paddingTop: "5px" }}
                      >
                        <h5>
                          <strong>
                            ${Number.parseFloat(it.price).toFixed(2)}
                            <span className="text-muted">{" X"}</span>
                          </strong>
                        </h5>
                      </div>
                      <div className="col-4 col-sm-4 col-md-4 text-md-left">
                        <div className="quantity">
                          <input
                            id={it._id}
                            className="nextLevel"
                            type="number"
                            step={1}
                            defaultValue={1}
                            min={1}
                            title="Qty"
                            className="form-control form-control-sm"
                            size={4}
                          />
                          <br />
                          <small>
                            <em>upto {it.available} units </em>
                          </small>
                        </div>
                      </div>
                      <div className="col-2 col-sm-2 col-md-2 text-right">
                        <button
                          onClick={this.onAddClick.bind(this, it._id, it.name)}
                          type="button"
                          className="btn btn-outline-success btn-s"
                        >
                          <i class="fa fa-cart-plus" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
              <div className="float-right">
                <a className="btn btn-outline-secondary float-right">
                  Add Items
                </a>
              </div>
            </div>
            <div className="card-footer">
              <div className="coupon col-md-5 col-sm-5 no-padding-left float-left">
                <div className="row">
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="cupone code"
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="submit"
                      className="btn btn-default"
                      defaultValue="Use cupone"
                    />
                  </div>
                </div>
              </div>
              <div className="float-right" style={{ margin: "10px" }}>
                <a className="btn btn-success float-right">Checkout</a>
                <div
                  className="float-right"
                  style={{ margin: "5px" }}
                  id="total-price"
                >
                  Total price:
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ShoppingItems.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, addToCart }
)(ShoppingItems);
