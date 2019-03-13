import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./userActions";
import * as types from "./types";
import expect from "expect";
import regeneratorRuntime from "regenerator-runtime";
import moxios from "moxios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("loginUser userActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    let expectedJson = { success: true };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedJson
      });
    });

    const expectedActions = [
      {
        payload: expectedJson,
        type: types.USER_LOGIN
      }
    ];

    const store = mockStore({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });

    let details = { username: "test@test.com", password: "1234" };

    return store.dispatch(actions.loginUser(details)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("loginUser userActions", () => {
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
        status: 404
      });
    });

    const expectedActions = [
      {
        type: types.USER_NOT_FOUND
      }
    ];

    const store = mockStore({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });

    let details = { username: "test@test", password: "1234" };

    return store.dispatch(actions.loginUser(details)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("signOutUser userActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    let expectedJson = { success: true };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedJson
      });
    });

    const expectedActions = [
      {
        payload: expectedJson,
        type: types.USER_SIGN_OUT
      }
    ];

    const store = mockStore({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });

    return store.dispatch(actions.signOutUser()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("checkAuth userActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    let expectedJson = { success: true };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedJson
      });
    });

    const expectedActions = [
      {
        payload: expectedJson.success,
        type: types.AUTH_CHECK
      }
    ];

    const store = mockStore({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });

    return store.dispatch(actions.checkAuth()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("removeCart userActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    let expectedJson = { success: true };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedJson
      });
    });

    let id = "2423a3c3b3de23ab32";

    const expectedActions = [
      {
        payload: id,
        type: types.REMOVE_CART
      }
    ];

    const store = mockStore({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });

    return store.dispatch(actions.removeCart(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("signupUser userActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    let expectedJson = { success: true };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedJson
      });
    });

    const expectedActions = [
      {
        payload: expectedJson,
        type: types.USER_SIGNUP
      }
    ];

    const store = mockStore({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });
    let details = { username: "test@test.com", password: "1234" };

    return store.dispatch(actions.signupUser(details)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
describe("signupUser userActions", () => {
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
        status: 401
      });
    });

    const expectedActions = [
      {
        type: types.INVALID_EMAIL
      }
    ];

    const store = mockStore({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });
    let details = { username: "tecom", password: "1234" };

    return store.dispatch(actions.signupUser(details)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("createCart userActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    let expectedJson = [
      { table: 6, _id: "234234", totalAmount: 0 },
      { table: 2, _id: "474234", totalAmount: 0 },
      { table: 1, _id: "234994", totalAmount: 432 }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedJson
      });
    });

    let table = 6;

    const expectedActions = [
      {
        payload: expectedJson,
        type: types.CREATE_CART
      }
    ];

    const store = mockStore({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });

    return store.dispatch(actions.createCart(table)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("userCarts userActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    let expectedJson = {
      info: [
        { table: 6, _id: "234234", totalAmount: 0 },
        { table: 2, _id: "474234", totalAmount: 0 },
        { table: 1, _id: "234994", totalAmount: 432 }
      ]
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedJson
      });
    });

    const expectedActions = [
      {
        payload: expectedJson.info,
        type: types.USER_CARTS
      }
    ];

    const store = mockStore({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });

    return store.dispatch(actions.userCarts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("userRefresh userActions", () => {
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
        status: 204
      });
    });

    const expectedActions = [
      {
        type: types.USER_REFRESH
      }
    ];

    const store = mockStore({
      isAuthenticated: false,
      cartSet: [],
      isAuthFailed: false,
      isSignFail: false,
      isSignWell: false
    });

    store.dispatch(actions.userRefresh());
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});
