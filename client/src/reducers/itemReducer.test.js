import reducer from "./itemReducer";
import * as types from "../actions/types";

describe("item reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      items: [],
      loading: false
    });
  });

  it("should handle GET_ITEMS", () => {
    const relevantAction = {
      type: types.GET_ITEMS,
      payload: [
        { _id: "2213", name: "a" },
        { _id: "1113", name: "b" },
        { _id: "2093", name: "c" },
        { _id: "1213", name: "d" }
      ]
    };
    expect(
      reducer(
        {
          items: [],
          loading: false
        },
        relevantAction
      )
    ).toEqual({
      items: [
        { _id: "2213", name: "a" },
        { _id: "1113", name: "b" },
        { _id: "2093", name: "c" },
        { _id: "1213", name: "d" }
      ],
      loading: false
    });
  });

  it("should handle ITEMS_LOADING", () => {
    const relevantAction = {
      type: types.ITEMS_LOADING
    };
    expect(
      reducer(
        {
          items: [],
          loading: false
        },
        relevantAction
      )
    ).toEqual({
      items: [],
      loading: true
    });
  });

  it("should handle DELETE_ITEM", () => {
    const relevantAction = {
      type: types.DELETE_ITEM,
      payload: "2213"
    };
    expect(
      reducer(
        {
          items: [
            { _id: "2213", name: "a" },
            { _id: "1113", name: "b" },
            { _id: "2093", name: "c" },
            { _id: "1213", name: "d" }
          ],
          loading: false
        },
        relevantAction
      )
    ).toEqual({
      items: [
        { _id: "1113", name: "b" },
        { _id: "2093", name: "c" },
        { _id: "1213", name: "d" }
      ],
      loading: false
    });
  });

  it("should handle ADD_ITEM", () => {
    const relevantAction = {
      type: types.ADD_ITEM,
      payload: { _id: "1713", name: "f" }
    };
    expect(
      reducer(
        {
          items: [
            { _id: "1113", name: "b" },
            { _id: "2093", name: "c" },
            { _id: "1213", name: "d" }
          ],
          loading: false
        },
        relevantAction
      )
    ).toEqual({
      items: [
        { _id: "1713", name: "f" },
        { _id: "1113", name: "b" },
        { _id: "2093", name: "c" },
        { _id: "1213", name: "d" }
      ],
      loading: false
    });
  });
});
