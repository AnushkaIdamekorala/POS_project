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
