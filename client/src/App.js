import React, { Component } from "react";

import NavbarNew from "./components/NavbarNew";

import CartList from "./components/CartList";
import ShoppingItems from "./components/ShoppingItems";

import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

import { connect } from "react-redux";
import { checkAuth, userCarts } from "./actions/userActions";

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
  }

  render() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
      return null;
    } else {
      return (
        <div className="App">
          <NavbarNew />
          <Container>
            <div class="split left bgimg">
              <Container>
                <ItemModal />
                <ShoppingItems />
              </Container>
            </div>
            <div class="split right bgimg2">
              <CartList />
            </div>
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { checkAuth, userCarts }
)(App);
