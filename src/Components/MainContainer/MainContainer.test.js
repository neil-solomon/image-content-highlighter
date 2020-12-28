import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainContainer from "./MainContainer";
import ImageBox from "../ImageBox";
import ImageBoxListItem from "../ImageBoxListItem";

Enzyme.configure({ adapter: new Adapter() });

describe("MainContainer", () => {
  it("should render 0 ImageBoxe first, then 2 after state.imageBoxes is set", () => {
    const imageBoxes_test = [
      {
        boxNumber: 0,
        topLeft: [0, 0],
        bottomRight: [100, 100],
        displayText: "box 1",
      },
      {
        boxNumber: 1,
        topLeft: [150, 150],
        bottomRight: [300, 300],
        displayText: "box 2",
      },
    ];

    const wrapper = shallow(<MainContainer />);
    var imageBoxElements = wrapper.find(ImageBox);
    expect(imageBoxElements).toHaveLength(0);

    wrapper.setState({ imageBoxes: imageBoxes_test });
    imageBoxElements = wrapper.find(ImageBox);
    expect(imageBoxElements).toHaveLength(2);
  });

  it("should render 0 ImageBoxListItem at first, then after state.imageBoxes is set", () => {
    const imageBoxes_test = [
      {
        boxNumber: 0,
        topLeft: [0, 0],
        bottomRight: [100, 100],
        displayText: "box 1",
      },
      {
        boxNumber: 1,
        topLeft: [150, 150],
        bottomRight: [300, 300],
        displayText: "box 2",
      },
    ];

    const wrapper = shallow(<MainContainer />);
    var imageBoxListItemElements = wrapper.find(ImageBoxListItem);
    expect(imageBoxListItemElements).toHaveLength(0);

    wrapper.setState({ imageBoxes: imageBoxes_test });
    imageBoxListItemElements = wrapper.find(ImageBox);
    expect(imageBoxListItemElements).toHaveLength(2);
  });
});
