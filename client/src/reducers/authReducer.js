import {
  USER_LOGIN,
  AUTH_CHECK,
  USER_CARTS,
  CREATE_CART,
  REMOVE_CART,
  SUBMIT_CART,
  USER_SIGN_OUT
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  cartSet: []
};

const submitRole = (id, total, cartSet) => {
  let index = cartSet.findIndex(x => x.cartId === id);
  cartSet[index].totalAmount = total;
  return cartSet;
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload)
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false
      };
    case AUTH_CHECK:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case USER_CARTS:
      return {
        ...state,
        cartSet: action.payload
      };
    case CREATE_CART:
      return {
        ...state,
        cartSet: action.payload
      };
    case REMOVE_CART:
      return {
        ...state,
        cartSet: state.cartSet.filter(item => item.cartId !== action.payload)
      };
    case SUBMIT_CART:
      return {
        ...state,
        cartSet: submitRole(
          action.payload.id,
          action.payload.total,
          state.cartSet
        )
      };

    default:
      return state;
  }
}
