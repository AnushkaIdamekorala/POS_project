import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShoppingItems from "../components/ShoppingItems";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import sinon from "sinon";

import configureStore from "redux-mock-store";

const middlewares = [thunk];

Enzyme.configure({ adapter: new Adapter() });

describe("components", () => {
  describe("Login component", () => {
    const mockStore = configureStore(middlewares);
    let store;
    const loginUser = sinon.spy();
    const userCarts = sinon.spy();

    const initialState = {
      item: {
        items: []
      },
      cart: {
        cartItems: []
      }
    };

    beforeEach(() => {
      store = mockStore(initialState);
    });
    it("should render self and subcomponents", () => {
      /* const props = {
        login: jest.fn()
      }; */
      const wrapper = mount(
        <Provider store={store}>
          <ShoppingItems />
        </Provider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
