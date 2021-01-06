import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainContainer from "./MainContainer";
import ProjectMenu from "../ProjectMenu";
import ImageBox from "../ImageBox";
import ImageBoxListItem from "../ImageBoxListItem";
import Menu from "../Menu";

Enzyme.configure({ adapter: new Adapter() });

describe("MainContainer", function () {
  it("should render 0 ImageBox first, then 2 after state.imageBoxes is set", function () {
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
    expect(wrapper.find(ImageBox)).toHaveLength(0);

    wrapper.setState({ imageBoxes: imageBoxes_test });
    expect(wrapper.find(ImageBox)).toHaveLength(2);
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
    expect(wrapper.find(ImageBox)).toHaveLength(2);
  });

  it("should render 1 Menu and 1 ProjectMenu", function () {
    const wrapper = shallow(<MainContainer />);
    expect(wrapper.find(Menu)).toHaveLength(1);
    expect(wrapper.find(ProjectMenu)).toHaveLength(1);
  });
});
