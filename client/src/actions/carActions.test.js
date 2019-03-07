import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./cartActions";
import * as types from "./types";
import expect from "expect";
import regeneratorRuntime from "regenerator-runtime";
import moxios from "moxios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("getCart cartActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    const expectedArray = [
      {
        _id: "5c6e3f2ccd583f2bd04e55cc",
        itm: {
          _id: "5c67bb90f004c93ecd7006bf",
          name: "Coke",
          productCode: 2,
          price: 100,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ",
          availableCount: 500,
          __v: 0
        },
        count: 1
      },
      {
        _id: "5c6e3fbc461b152d009ba691",
        itm: {
          _id: "5c67bd07f004c93ecd7006c6",
          name: "Ice Cream",
          productCode: 9,
          price: 120,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ",
          availableCount: 170,
          __v: 0
        },
        count: 1
      },
      {
        _id: "5c6e5d167d83b649d32e3c0c",
        itm: {
          _id: "5c67bbc7f004c93ecd7006c0",
          name: "Apple",
          productCode: 3,
          price: 80,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ",
          availableCount: 600,
          __v: 0
        },
        count: 4
      },
      {
        _id: "5c6fce27dedd73364924ed67",
        itm: {
          _id: "5c67bc01f004c93ecd7006c2",
          name: "Milk",
          productCode: 5,
          price: 200,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ",
          availableCount: 400,
          __v: 0
        },
        count: 4
      },
      {
        _id: "5c7379de4316081c7de67208",
        itm: {
          _id: "5c67bc28f004c93ecd7006c3",
          name: "Cheese",
          productCode: 6,
          price: 350,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ",
          availableCount: 70,
          __v: 0
        },
        count: 1
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedArray
      });
    });

    const expectedActions = [
      { type: types.CART_LOADING },
      {
        payload: expectedArray,
        type: types.GET_CART
      }
    ];

    const store = mockStore({
      cartItems: [],
      totalAmount: 0,
      cartLoading: false,
      cartId: "5c6a4c226c7e0a0f2c7ea2fb"
    });

    return store.dispatch(actions.getCart()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("addToCart cartActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [1, 2, 3, 4]
      });
    });

    const expectedActions = [
      {
        payload: [1, 2, 3, 4],
        type: types.ADD_TO_CART
      }
    ];

    const store = mockStore({ cartItems: [], total: 0, cartLoading: false });

    const id = "5c6bf6cdd2104b6379fdf49c";
    const count = 6;

    return store.dispatch(actions.addToCart(id, count)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("deleteFromCart cartActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true }
      });
    });

    const id = "5c6bf6cdd2104b6379fdf49c";

    const expectedActions = [
      {
        payload: id,
        type: types.DELETE_FROM_CART
      }
    ];

    const store = mockStore({ cartItems: [], total: 0, cartLoading: false });

    return store.dispatch(actions.deleteFromCart(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("updateCount cartActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true }
      });
    });

    const id = "5c6bf6cdd2104b6379fdf49c";
    const count = 4;

    const expectedActions = [
      {
        payload: {
          idd: id,
          countt: count
        },
        type: types.UPDATE_COUNT
      }
    ];

    const store = mockStore({ cartItems: [], total: 0, cartLoading: false });

    return store.dispatch(actions.updateCount(id, count)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("clearCart cartActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true }
      });
    });

    const expectedActions = [
      {
        payload: { success: true },
        type: types.CLEAR_CART
      }
    ];

    const store = mockStore({ cartItems: [], total: 0, cartLoading: false });

    return store.dispatch(actions.clearCart()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
