import React, { Component } from "react";

import NavbarNew from "./components/NavbarNew";

import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  checkAuth,
  userCarts,
  createCart,
  removeCart
} from "./actions/userActions";
import { setCart } from "./actions/cartActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
    } else {
      this.props.userCarts();
    }
  }

  componentWillMount() {
    this.props.checkAuth();
    this.props.userCarts();
  }

  onOpenClick(id) {
    this.props.setCart(id);
    this.props.history.push("/table");
  }
  onDeleteClick(id) {
    this.props.removeCart(id);
  }

  onAddClick() {
    this.props.createCart(document.getElementById("tableNo").value);
    document.getElementById("tableNo").value = 1;
  }

  choose(total) {
    if (total === 0) {
      return (
        <p class="card-text">
          <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true" />
          <br /> <h4>Filling cart</h4>
        </p>
      );
    } else {
      return (
        <p class="card-text">
          <br /> <h1>${total}.00</h1>
        </p>
      );
    }
  }

  render() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
      return null;
    } else {
      const { cartSet } = this.props.auth;

      document.body.style.backgroundImage =
        "url('https://ak7.picdn.net/shutterstock/videos/2553467/thumb/1.jpg')";

      return (
        <div>
          <NavbarNew />
          <Container>
            <div class="row">
              <h1>My Orders</h1>
            </div>
            <div class="container-fluid ">
              <div class="row">
                {cartSet.map(it => (
                  <div class="col-sm-3">
                    <div class="card">
                      <div class="card-body cross-new">
                        <div class="col-sm-1 cross-coner">
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-xs"
                            onClick={this.onDeleteClick.bind(this, it.cartId)}
                            text-align="left"
                          >
                            <i
                              class="fa fa-window-close  fa-xs"
                              aria-hidden="false"
                            />
                          </button>
                        </div>
                        <img
                          className="img-responsive cross-coner"
                          alt={34}
                          src="https://cdn0.iconfinder.com/data/icons/food-volume-2-4/48/03-512.png"
                          width={150}
                          height={150}
                        />
                        <h2 class="card-title">Table {it.table}</h2>
                        <h3 class="card-subtitle mb-2 text-muted">
                          Order No-
                          {parseInt(
                            "0x" +
                              it.cartId.substring(
                                it.cartId.length - 3,
                                it.cartId.length
                              )
                          )}
                        </h3>
                        {this.choose(it.totalAmount)}
                        <button
                          type="button"
                          className="btn btn-success "
                          onClick={this.onOpenClick.bind(this, it.cartId)}
                        >
                          View Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div class="col-sm-3">
                  <div class="card">
                    <div class="card-body">
                      <br />
                      <img
                        className="img-responsive"
                        alt={34}
                        src="https://image.flaticon.com/icons/svg/61/61183.svg"
                        width={150}
                        height={150}
                      />
                      <h2 class="card-title">New Order</h2>
                      <h4>Choose Table</h4>
                      <div class="row">
                        <div class="col-sm-3 text-center">{"  "}</div>
                        <div class="col-sm-6 text-center">
                          <input
                            id="tableNo"
                            type="number"
                            step={1}
                            defaultValue={1}
                            className="form-control form-control-lg"
                            borderColor="red"
                          />
                        </div>
                      </div>
                      <br />
                      <button
                        type="button"
                        className="btn btn-success "
                        onClick={this.onAddClick.bind(this)}
                      >
                        Add Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      );
    }
  }
}

Home.propTypes = {
  checkAuth: PropTypes.func.isRequired,
  userCarts: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { checkAuth, userCarts, setCart, createCart, removeCart }
)(Home);
