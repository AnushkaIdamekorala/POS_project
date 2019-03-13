import {
  GET_CART,
  ADD_TO_CART,
  DELETE_FROM_CART,
  CART_LOADING,
  UPDATE_COUNT,
  CLEAR_CART,
  SET_CART_ID
} from "../actions/types";

const initialState = {
  cartId: "",
  cartItems: [],
  cartLoading: false,
  totalAmount: 0
};

export default function(state = initialState, action) {
  let detail;
  switch (action.type) {
    case GET_CART:
      detail = {
        ...state,
        cartItems: action.payload.items, ///sure naaa
        cartLoading: false
      };
      break;
    case DELETE_FROM_CART:
      detail = {
        ...state,
        cartItems: state.cartItems.filter(item => item._id !== action.payload)
      };
      break;
    case ADD_TO_CART:
      detail = {
        ...state,
        cartItems: action.payload.items
      };
      break;
    case CART_LOADING:
      detail = {
        ...state,
        cartLoading: true
      };
      break;
    case UPDATE_COUNT:
      let objIndex = state.cartItems.findIndex(obj => {
        return obj._id === action.payload.idd;
      });
      let a = Object.assign([], state.cartItems);
      a[objIndex].count = action.payload.countt;
      detail = {
        ...state,
        cartItems: a
      };
      break;
    case CLEAR_CART:
      detail = {
        ...state,
        cartItems: []
      };
      break;
    case SET_CART_ID:
      detail = {
        ...state,
        cartId: action.payload
      };
      break;
    default:
      return state;
  }
  detail.totalAmount = 0;
  if (detail.cartItems.length > 1) {
    var g = detail.cartItems.map(item => {
      detail.totalAmount = detail.totalAmount + item.count * item.itm.price;
      return null;
    });
  } else if (detail.cartItems.length === 1) {
    detail.totalAmount =
      detail.cartItems[0].count * detail.cartItems[0].itm.price;
  } else {
    detail.totalAmount = 0;
  }
  return detail;
}
