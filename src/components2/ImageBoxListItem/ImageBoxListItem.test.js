import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ImageBoxListItem from "./ImageBoxListItem";

Enzyme.configure({ adapter: new Adapter() });

describe("ImageBoxListItem", function () {
  it("should render 8 div if active", function () {
    const wrapper = shallow(
      <ImageBoxListItem
        boxNumber={0}
        active={true}
        displayText={"displayText_test"}
        clickUrl={"clickUrl_test"}
        clickTarget={"clickTarget_test"}
      />
    );

    const divs = wrapper.find("div");
    expect(divs).toHaveLength(8);
  });

  it("should render 3 div if not active", function () {
    const wrapper = shallow(
      <ImageBoxListItem
        boxNumber={0}
        active={false}
        displayText={"displayText_test"}
        clickUrl={"clickUrl_test"}
        clickTarget={"clickTarget_test"}
      />
    );

    const divs = wrapper.find("div");
    expect(divs).toHaveLength(3);
  });

  it("should render proper boxNumber, displayText, and clickUrl if active", function () {
    const wrapper = shallow(
      <ImageBoxListItem
        boxNumber={0}
        active={true}
        displayText={"displayText_test"}
        clickUrl={"clickUrl_test"}
        clickTarget={"clickTarget_test"}
      />
    );

    const divs = wrapper.find("div");
    expect(divs.get(1).props.children[1]).toEqual(1); // boxNumber

    const textArea = wrapper.find("textarea");
    expect(textArea.get(0).props.value).toEqual("displayText_test");
    expect(textArea.get(1).props.value).toEqual("clickUrl_test");
  });

  it("should render disabled checkbox if clickUrl is blank, else an enabled checkbox", function () {
    var wrapper = shallow(
      <ImageBoxListItem
        boxNumber={0}
        active={true}
        displayText={"displayText_test"}
        clickUrl={""}
        clickTarget={"_self"}
      />
    );

    var checkbox = wrapper.find("input");
    expect(checkbox.get(0).props.disabled).toEqual(true);

    wrapper = shallow(
      <ImageBoxListItem
        boxNumber={0}
        active={true}
        displayText={"displayText_test"}
        clickUrl={"clickUrl_test"}
        clickTarget={"_self"}
      />
    );

    checkbox = wrapper.find("input");
    expect(checkbox.get(0).props.disabled).toEqual(false);
  });
});
