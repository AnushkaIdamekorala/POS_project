import reducer from "./authReducer";
import * as types from "../actions/types";

describe("cart reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });
  });

  it("should handle USER_LOGIN", () => {
    const relevantAction = {
      type: types.USER_LOGIN,
      payload: "dsfsdf"
    };
    expect(
      reducer(
        {
          isAuthenticated: false,
          cartSet: [],
          isAuthFailed: false,
          isSignFail: false,
          isSignWell: false
        },
        relevantAction
      )
    ).toEqual({
      isAuthenticated: true,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });
  });

  it("should handle USER_SIGN_OUT", () => {
    const relevantAction = {
      type: types.USER_SIGN_OUT
    };
    expect(
      reducer(
        {
          isAuthenticated: true,
          cartSet: [],
          isAuthFailed: false,
          isSignFail: false,
          isSignWell: false
        },
        relevantAction
      )
    ).toEqual({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });
  });

  it("should handle USER_NOT_FOUND", () => {
    const relevantAction = {
      type: types.USER_NOT_FOUND
    };
    expect(
      reducer(
        {
          isAuthenticated: false,
          cartSet: [],
          isAuthFailed: false,
          isSignFail: false,
          isSignWell: false
        },
        relevantAction
      )
    ).toEqual({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: true,
      isSignFail: false,
      isSignWell: false
    });
  });

  it("should handle USER_REFRESH", () => {
    const relevantAction = {
      type: types.USER_REFRESH
    };
    expect(
      reducer(
        {
          isAuthenticated: false,
          cartSet: [],
          isAuthFailed: true,
          isSignFail: false,
          isSignWell: false
        },
        relevantAction
      )
    ).toEqual({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });
  });

  it("should handle AUTH_CHECK", () => {
    const relevantAction = {
      type: types.AUTH_CHECK,
      payload: true
    };
    expect(
      reducer(
        {
          isAuthenticated: false,
          cartSet: [],
          isAuthFailed: false,
          isSignFail: false,
          isSignWell: false
        },
        relevantAction
      )
    ).toEqual({
      isAuthenticated: true,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });
  });

  it("should handle USER_SIGNUP", () => {
    const relevantAction = {
      type: types.USER_SIGNUP,
      payload: true
    };
    expect(
      reducer(
        {
          isAuthenticated: false,
          cartSet: [],
          isAuthFailed: false,
          isSignFail: false,
          isSignWell: false
        },
        relevantAction
      )
    ).toEqual({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: true
    });
  });

  it("should handle USER_CARTS", () => {
    const relevantAction = {
      type: types.USER_CARTS,
      payload: [
        { table: 6, cartId: "234234", totalAmount: 0 },
        { table: 2, cartId: "474234", totalAmount: 0 },
        { table: 1, cartId: "234994", totalAmount: 432 }
      ]
    };
    expect(
      reducer(
        {
          isAuthenticated: true,
          cartSet: [],
          isAuthFailed: false,
          isSignFail: false,
          isSignWell: false
        },
        relevantAction
      )
    ).toEqual({
      isAuthenticated: true,
      cartSet: [
        { table: 6, cartId: "234234", totalAmount: 0 },
        { table: 2, cartId: "474234", totalAmount: 0 },
        { table: 1, cartId: "234994", totalAmount: 432 }
      ],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });
  });

  it("should handle CREATE_CART", () => {
    const relevantAction = {
      type: types.CREATE_CART,
      payload: [
        { table: 6, cartId: "234234", totalAmount: 0 },
        { table: 2, cartId: "474234", totalAmount: 0 },
        { table: 1, cartId: "234994", totalAmount: 432 }
      ]
    };
    expect(
      reducer(
        {
          isAuthenticated: true,
          cartSet: [
            { table: 2, cartId: "474234", totalAmount: 0 },
            { table: 1, cartId: "234994", totalAmount: 432 }
          ],
          isAuthFailed: false,
          isSignFail: false,
          isSignWell: false
        },
        relevantAction
      )
    ).toEqual({
      isAuthenticated: true,
      cartSet: [
        { table: 6, cartId: "234234", totalAmount: 0 },
        { table: 2, cartId: "474234", totalAmount: 0 },
        { table: 1, cartId: "234994", totalAmount: 432 }
      ],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });
  });

  it("should handle REMOVE_CART", () => {
    const relevantAction = {
      type: types.REMOVE_CART,
      payload: "234994"
    };
    expect(
      reducer(
        {
          isAuthenticated: true,
          cartSet: [
            { table: 6, cartId: "234234", totalAmount: 0 },
            { table: 2, cartId: "474234", totalAmount: 0 },
            { table: 1, cartId: "234994", totalAmount: 432 }
          ],
          isAuthFailed: false,
          isSignFail: false,
          isSignWell: false
        },
        relevantAction
      )
    ).toEqual({
      isAuthenticated: true,
      cartSet: [
        { table: 6, cartId: "234234", totalAmount: 0 },
        { table: 2, cartId: "474234", totalAmount: 0 }
      ],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });
  });

  it("should handle SUBMIT_CART", () => {
    const relevantAction = {
      type: types.SUBMIT_CART,
      payload: { id: "234234", total: 500 }
    };
    expect(
      reducer(
        {
          isAuthenticated: true,
          cartSet: [
            { table: 6, cartId: "234234", totalAmount: 0 },
            { table: 2, cartId: "474234", totalAmount: 0 }
          ],
          isAuthFailed: false,
          isSignFail: false,
          isSignWell: false
        },
        relevantAction
      )
    ).toEqual({
      isAuthenticated: true,
      cartSet: [
        { table: 6, cartId: "234234", totalAmount: 500 },
        { table: 2, cartId: "474234", totalAmount: 0 }
      ],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });
  });
});
