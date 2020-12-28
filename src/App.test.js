import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";
import MainContainer from "./components/MainContainer";

Enzyme.configure({ adapter: new Adapter() });

describe("App", function () {
  it("should render 1 MainContainer", function () {
    const wrapper = shallow(<App />);
    const mainContainer = wrapper.find(MainContainer);
    expect(mainContainer).toHaveLength(1);
  });
});
