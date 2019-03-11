import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "../Login";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import sinon from "sinon";
import { BrowserRouter as Router } from "react-router-dom";

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
      auth: {
        email: "",
        password: ""
      },
      loginUser,
      userCarts
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
          <Router>
            <Login />
          </Router>
        </Provider>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("simulate button action", () => {
      const wrapper = mount(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      );
      //console.log(wrapper.debug());
      wrapper.find(".login_btn").simulate("click");
      // expect(loginUser.calledOnce).toBe(true);
      //   expect(loginUser.calledOnce);
      expect(wrapper.find(".form-control").simulate("change"));
    });
  });
});
