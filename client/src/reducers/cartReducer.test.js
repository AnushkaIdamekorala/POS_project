import reducer from "./cartReducer";
import * as types from "../actions/types";

var id = "23ac34de23b23ace23";

describe("cart reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      cartId: "",
      cartItems: [],
      cartLoading: false,
      totalAmount: 0
    });
  });

  it("should handle SET_CART_ID", () => {
    const relevantAction = {
      type: types.SET_CART_ID,
      payload: id
    };
    expect(
      reducer(
        {
          cartId: "",
          cartItems: [],
          cartLoading: false,
          totalAmount: 0
        },
        relevantAction
      )
    ).toEqual({
      cartId: id,
      cartItems: [],
      cartLoading: false,
      totalAmount: 0
    });
  });

  it("should handle GET_CART", () => {
    const getCartAction = {
      type: types.GET_CART,
      payload: {
        _id: id,
        items: [
          { _id: "1232313acd", itm: { price: 20 }, count: 4 },
          { _id: "2542313acd", itm: { price: 55 }, count: 1 }
        ]
      }
    };
    expect(
      reducer(
        {
          cartId: id,
          cartItems: [],
          cartLoading: false,
          totalAmount: 0
        },
        getCartAction
      )
    ).toEqual({
      cartId: id,
      cartItems: [
        { _id: "1232313acd", itm: { price: 20 }, count: 4 },
        { _id: "2542313acd", itm: { price: 55 }, count: 1 }
      ],
      cartLoading: false,
      totalAmount: 135
    });
  });

  it("should handle DELETE_FROM_CART", () => {
    const deleteCartItemAction = {
      type: types.DELETE_FROM_CART,
      payload: "2542313acd"
    };

    expect(
      reducer(
        {
          cartId: id,
          cartItems: [
            { _id: "1232313acd", itm: { price: 20 }, count: 4 },
            { _id: "2542313acd", itm: { price: 55 }, count: 1 }
          ],
          cartLoading: false,
          totalAmount: 135
        },
        deleteCartItemAction
      )
    ).toEqual({
      cartId: id,
      cartItems: [{ _id: "1232313acd", itm: { price: 20 }, count: 4 }],
      cartLoading: false,
      totalAmount: 80
    });
  });

  it("should handle ADD_TO_CART", () => {
    const addCartItemAction = {
      type: types.ADD_TO_CART,
      payload: {
        _id: id,
        items: [
          { _id: "1232313acd", itm: { price: 20 }, count: 4 },
          { _id: "123ab13ac1", itm: { price: 40 }, count: 2 }
        ]
      }
    };

    expect(
      reducer(
        {
          cartId: id,
          cartItems: [{ _id: "1232313acd", itm: { price: 20 }, count: 4 }],
          cartLoading: false,
          totalAmount: 80
        },
        addCartItemAction
      )
    ).toEqual({
      cartId: id,
      cartItems: [
        { _id: "1232313acd", itm: { price: 20 }, count: 4 },
        { _id: "123ab13ac1", itm: { price: 40 }, count: 2 }
      ],
      cartLoading: false,
      totalAmount: 160
    });
  });

  it("should handle UPDATE_COUNT", () => {
    const updateCartItemAction = {
      type: types.UPDATE_COUNT,
      payload: {
        idd: "1232313acd",
        countt: 6
      }
    };

    expect(
      reducer(
        {
          cartId: id,
          cartItems: [
            { _id: "1232313acd", itm: { price: 20 }, count: 4 },
            { _id: "123ab13ac1", itm: { price: 40 }, count: 2 }
          ],
          cartLoading: false,
          totalAmount: 160
        },
        updateCartItemAction
      )
    ).toEqual({
      cartId: id,
      cartItems: [
        { _id: "1232313acd", itm: { price: 20 }, count: 6 },
        { _id: "123ab13ac1", itm: { price: 40 }, count: 2 }
      ],
      cartLoading: false,
      totalAmount: 200
    });
  });

  it("should handle CART_LOADING", () => {
    expect(
      reducer(
        {
          cartId: id,
          cartItems: [
            { _id: "1232313acd", itm: { price: 20 }, count: 6 },
            { _id: "123ab13ac1", itm: { price: 40 }, count: 2 }
          ],
          cartLoading: false,
          totalAmount: 200
        },
        {
          type: types.CART_LOADING
        }
      )
    ).toEqual({
      cartId: id,
      cartItems: [
        { _id: "1232313acd", itm: { price: 20 }, count: 6 },
        { _id: "123ab13ac1", itm: { price: 40 }, count: 2 }
      ],
      cartLoading: true,
      totalAmount: 200
    });
  });
});
