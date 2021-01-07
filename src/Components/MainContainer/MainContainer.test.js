import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainContainer from "./MainContainer";
import ProjectMenu from "../ProjectMenu";
import ImageContainer from "../ImageContainer";
import ImageBoxListItem from "../ImageBoxListItem";
import MainMenu from "../MainMenu";

Enzyme.configure({ adapter: new Adapter() });

describe("MainContainer", function () {
  it("should render 1 MainMenu, 1 ProjectMenu, 1 ImageContainer", function () {
    const wrapper = shallow(<MainContainer />);
    expect(wrapper.find(MainMenu)).toHaveLength(1);
    expect(wrapper.find(ProjectMenu)).toHaveLength(1);
    expect(wrapper.find(ImageContainer)).toHaveLength(1);
  });

  it("should render 0 ImageBoxListItem at first, then 2 after state.imageBoxes is set", function () {
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
    expect(wrapper.find(ImageBoxListItem)).toHaveLength(0);

    wrapper.setState({ imageBoxes: imageBoxes_test });
    expect(wrapper.find(ImageBoxListItem)).toHaveLength(2);
  });
});
