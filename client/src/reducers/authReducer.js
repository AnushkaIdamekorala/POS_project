import {
  USER_LOGIN,
  USER_NOT_FOUND,
  USER_REFRESH,
  USER_SIGNUP,
  INVALID_EMAIL,
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
  cartSet: [],
  isAuthFailed: false,
  isSignFail: false,
  isSignWell: false
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
        isAuthenticated: !isEmpty(action.payload),
        isAuthFailed: false
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false
      };
    case USER_NOT_FOUND:
      return {
        ...state,
        isAuthenticated: false,
        isAuthFailed: true
      };
    case INVALID_EMAIL:
      return {
        ...state,
        isSignFail: true,
        isSignWell: false
      };
    case USER_REFRESH:
      return {
        ...state,
        isAuthFailed: false,
        isSignWell: false,
        isSignFail: false
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
    case USER_SIGNUP:
      return {
        ...state,
        isSignWell: true,
        isSignFail: false
      };

    default:
      return state;
  }
}
