import axios from "axios";
import {
  USER_LOGIN,
  USER_NOT_FOUND,
  USER_REFRESH,
  USER_SIGN_OUT,
  AUTH_CHECK,
  USER_CARTS,
  CREATE_CART,
  USER_SIGNUP,
  MAIL_EXIST,
  INVALID_EMAIL,
  REMOVE_CART
} from "./types";

export const loginUser = details => dispatch => {
  axios
    .post("/api/user/login", details)
    .then(res =>
      dispatch({
        type: USER_LOGIN,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: USER_NOT_FOUND,
        payload: res.data
      })
    );
};

export const userRefresh = () => dispatch => {
  dispatch({
    type: USER_REFRESH
  });
};

export const signOutUser = () => dispatch => {
  axios.get("/api/user/signout").then(res =>
    dispatch({
      type: USER_SIGN_OUT,
      payload: res.data
    })
  );
};

export const checkAuth = () => dispatch => {
  axios.post("/api/user/checkAuth").then(res =>
    dispatch({
      type: AUTH_CHECK,
      payload: res.data.success
    })
  );
};

export const userCarts = () => dispatch => {
  axios.get("/api/user/what").then(res =>
    dispatch({
      type: USER_CARTS,
      payload: res.data.info
    })
  );
};

export const createCart = table => dispatch => {
  axios.get(`/api/user/create/${table}`).then(res =>
    dispatch({
      type: CREATE_CART,
      payload: res.data
    })
  );
};

export const removeCart = id => dispatch => {
  axios.delete(`/api/user/removecart/${id}`).then(res => {
    if (res.data.success) {
      dispatch({
        type: REMOVE_CART,
        payload: id
      });
    } else {
    }
  });
};

export const signupUser = details => dispatch => {
  axios
    .post("/api/user/signup", details)
    .then(res =>
      dispatch({
        type: USER_SIGNUP,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: INVALID_EMAIL
      })
    );
};

/*
{
      console.log(res);
      if (res.data.message === "Mail exists") {
        dispatch({
          type: MAIL_EXIST
        });
      } else {
        dispatch({
        type: INVALID_EMAIL
      })
       
      }
    }*/
