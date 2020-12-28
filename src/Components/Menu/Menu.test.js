import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Menu from "./Menu.js";

Enzyme.configure({ adapter: new Adapter() });

describe("Menu", function () {
  it("should render 5 div, 2 input, 2 button, 1 select", function () {
    const wrapper = shallow(
      <Menu filename="filename_test" highlightColor="rgb(200,200,200)" />
    );
    expect(wrapper.find("div")).toHaveLength(5);
    expect(wrapper.find("input")).toHaveLength(2);
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("select")).toHaveLength(1);
  });

  it("should show the proper highlightColor in the fourth div", function () {
    const wrapper = shallow(
      <Menu filename="filename_test" highlightColor="rgb(200,200,200)" />
    );
    expect(wrapper.find("div").get(3).props.style).toHaveProperty(
      "backgroundColor",
      "rgb(200,200,200)"
    );
  });

  it("should render the button disabled if filename is blank, enabled otherwise", function () {
    var wrapper = shallow(
      <Menu filename="" highlightColor="rgb(200,200,200)" />
    );
    expect(wrapper.find("button").get(0).props.disabled).toEqual(true);

    wrapper = shallow(
      <Menu filename="filename_test" highlightColor="rgb(200,200,200)" />
    );
    expect(wrapper.find("button").get(0).props.disabled).toEqual(false);
  });
});
