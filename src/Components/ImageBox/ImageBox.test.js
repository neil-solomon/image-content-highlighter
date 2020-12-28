import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ImageBox from "./ImageBox";

Enzyme.configure({ adapter: new Adapter() });

describe("ImageBox", function () {
  it("should render 1 div with proper styling if not active", function () {
    const wrapper = shallow(
      <ImageBox
        boxNumber={0}
        left={50}
        top={50}
        width={100}
        height={100}
        active={false}
        highlightColor="rgb(0,0,0)"
        boxNumber={0}
        highlightColor="rgb(0,0,0)"
      />
    );

    const divs = wrapper.find("div");
    expect(divs).toHaveLength(1);
    expect(divs.text()).toEqual("1");

    const divsStyle0 = divs.get(0).props.style;
    expect(divsStyle0).toHaveProperty("height", 100);
    expect(divsStyle0).toHaveProperty("width", 100);
    expect(divsStyle0).toHaveProperty("top", 50);
    expect(divsStyle0).toHaveProperty("left", 50);
    expect(divsStyle0).toHaveProperty("border", "2px dotted rgb(0,0,0)");
    expect(divsStyle0).toHaveProperty("cursor", "pointer");
    expect(divsStyle0).toHaveProperty("color", "rgb(0,0,0)");
    expect(divsStyle0).toHaveProperty("backgroundColor", "rgb(0,0,0,.1)");
  });

  it("should render 2 div with proper styling if active", function () {
    const wrapper = shallow(
      <ImageBox
        boxNumber={0}
        left={50}
        top={50}
        width={100}
        height={100}
        active={true}
        highlightColor="rgb(0,0,0)"
        boxNumber={0}
        highlightColor="rgb(0,0,0)"
      />
    );

    const divs = wrapper.find("div");
    expect(divs).toHaveLength(2);

    const divsStyle0 = divs.get(0).props.style;
    expect(divsStyle0).toHaveProperty("height", 100);
    expect(divsStyle0).toHaveProperty("width", 100);
    expect(divsStyle0).toHaveProperty("top", 50);
    expect(divsStyle0).toHaveProperty("left", 50);
    expect(divsStyle0).toHaveProperty("border", "2px solid rgb(0,0,0)");
    expect(divsStyle0).toHaveProperty("cursor", "move");
    expect(divsStyle0).toHaveProperty("color", "rgb(0,0,0)");
    expect(divsStyle0).toHaveProperty("backgroundColor", "rgb(0,0,0,.1)");

    const divsStyle1 = divs.get(1).props.style;
    expect(divsStyle1).toHaveProperty("top", 95);
    expect(divsStyle1).toHaveProperty("left", 95);
    expect(divsStyle1).toHaveProperty("cursor", "nw-resize");
    expect(divsStyle1).toHaveProperty("backgroundColor", "rgb(0,0,0)");
  });
});
