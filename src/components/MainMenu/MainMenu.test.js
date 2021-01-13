import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainMenu from "./MainMenu.js";
import { Tooltip } from "antd";

Enzyme.configure({ adapter: new Adapter() });

describe("MainMenu", function () {
  it("should render 1 div and 1 Tooltip", function () {
    const wrapper = shallow(<MainMenu />);
    expect(wrapper.find("div")).toHaveLength(1);
    expect(wrapper.find(Tooltip)).toHaveLength(1);
  });
});
