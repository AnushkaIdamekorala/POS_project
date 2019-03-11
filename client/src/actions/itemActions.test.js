import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./itemActions";
import * as types from "./types";
import expect from "expect";
import regeneratorRuntime from "regenerator-runtime";
import moxios from "moxios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("getItems itemActions", () => {
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
      { type: types.ITEMS_LOADING },
      {
        payload: expectedArray,
        type: types.GET_ITEMS
      }
    ];

    const store = mockStore({
      items: [],
      loading: false
    });

    return store.dispatch(actions.getItems()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("addItem itemActions", () => {
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
      {
        payload: expectedArray,
        type: types.ADD_ITEM
      }
    ];

    const store = mockStore({
      items: [],
      loading: false
    });
    let item = { name: "Tea", available: 1000, price: 28 };

    return store.dispatch(actions.addItem(item)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("deleteItem itemActions", () => {
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
    let id = "345245a5b54f54d4ce";

    const expectedActions = [
      {
        payload: id,
        type: types.DELETE_ITEM
      }
    ];

    const store = mockStore({
      items: [],
      loading: false
    });
    let item = { name: "Tea", available: 1000, price: 28 };

    return store.dispatch(actions.deleteItem(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("setItemsLoading itemActions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  test("correctly", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      const expectedActions = [
        {
          type: types.ITEMS_LOADING
        }
      ];

      const store = mockStore({
        items: [],
        loading: false
      });
      return store.dispatch(actions.setItemsLoading()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
