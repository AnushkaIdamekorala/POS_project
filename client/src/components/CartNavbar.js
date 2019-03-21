import React, { Component } from "react";
import { Navbar, NavbarToggler, NavbarBrand, Container } from "reactstrap";
import { connect } from "react-redux";
import { clearCart } from "../actions/cartActions";

class CartNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { cartId } = this.props.cart;
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5 sticky-top">
          <Container>
            <NavbarBrand href="/">
              <i className="fa fa-shopping-cart" aria-hidden="true" />
              {"   Shopping Cart for No." +
                parseInt(
                  "0x" + cartId.substring(cartId.length - 3, cartId.length)
                )}
            </NavbarBrand>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active" />
                <li className="nav-item ">
                  <button
                    className="btn btn-warning putha"
                    type="button"
                    onClick={this.props.clearCart}
                  >
                    <i className="fa fa-fire" aria-hidden="true" />
                    {"   Clear Cart"}
                  </button>
                </li>
              </ul>
            </div>
            <NavbarToggler onClick={this.toggle} />
          </Container>
        </Navbar>
      </div>
    );
  }
}

CartNavbar.propTypes = {};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { clearCart }
)(CartNavbar);
