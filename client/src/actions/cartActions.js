import axios from "axios";
import {
  GET_CART,
  ADD_TO_CART,
  DELETE_FROM_CART,
  CART_LOADING,
  UPDATE_COUNT,
  CLEAR_CART,
  SET_CART_ID,
  SUBMIT_CART
} from "./types";

var cart = "";

export const getCart = () => dispatch => {
  dispatch(setCartLoading());
  return axios.get(`/api/carts/${cart}`).then(res =>
    dispatch({
      type: GET_CART,
      payload: res.data
    })
  );
};

export const addToCart = (id, count) => dispatch => {
  return axios
    .post("/api/carts", {
      _id: cart,
      itm: id,
      count: count
    })
    .then(res =>
      dispatch({
        type: ADD_TO_CART,
        payload: res.data
      })
    );
};

export const deleteFromCart = id => dispatch => {
  return axios.delete(`/api/carts/${cart}/${id}`).then(res =>
    dispatch({
      type: DELETE_FROM_CART,
      payload: id
    })
  );
};

export const setCartLoading = () => {
  return {
    type: CART_LOADING
  };
};

export const updateCount = (id, count) => dispatch => {
  return axios.put(`/api/carts/${cart}/${id}/${count}`).then(res =>
    dispatch({
      type: UPDATE_COUNT,
      payload: { idd: id, countt: count }
    })
  );
};

export const clearCart = () => dispatch => {
  return axios.delete(`/api/carts/${cart}`).then(res =>
    dispatch({
      type: CLEAR_CART,
      payload: res.data
    })
  );
};

export const setCart = id => dispatch => {
  dispatch(doit(id));
};
export const doit = id => {
  cart = id;
  return {
    type: SET_CART_ID,
    payload: id
  };
};

export const submitOrder = (cartId, totalAmount) => dispatch => {
  return axios.put(`/api/user/cash/${cartId}/${totalAmount}`).then(res =>
    dispatch({
      type: SUBMIT_CART,
      payload: { id: cartId, total: totalAmount }
    })
  );
};
