import React, { Component } from "react";

import NavbarNew from "./components/NavbarNew";

import CartList from "./components/CartList";
import ShoppingItems from "./components/ShoppingItems";
import Spinner from "./components/Spinner";

import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

import { connect } from "react-redux";
import { checkAuth, userCarts } from "./actions/userActions";
import { getCart } from "./actions/cartActions";

import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
    } else {
      this.props.userCarts();
    }
  }
  componentWillMount() {
    this.props.checkAuth();
    this.props.getCart();
  }

  render() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
      return null;
    } else {
      const { cartLoading } = this.props.cart;
      var element;
      if (cartLoading) {
        element = <Spinner />;
      } else {
        element = <CartList />;
      }

      return (
        <div className="App">
          <NavbarNew />
          <Container>
            <div className="split left bgimg">
              <Container>
                <ItemModal />
                <ShoppingItems />
              </Container>
            </div>
            <div className="split right bgimg2">{element}</div>
          </Container>
        </div>
      );
    }
  }
}

App.propTypes = {
  checkAuth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { checkAuth, userCarts, getCart }
)(App);
