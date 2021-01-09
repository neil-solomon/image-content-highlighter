import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainContainer from "./MainContainer";
import ProjectMenu from "../ProjectMenu";
import ImageContainer from "../ImageContainer";
import ImageBoxListItem from "../ImageBoxListItem";
import MainMenu from "../MainMenu";
import ModalMenu from "../ModalMenu";
import {
  UserOutlined,
  DatabaseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

Enzyme.configure({ adapter: new Adapter() });

describe("MainContainer", function () {
  it("should render 1 MainMenu, 1 ModalMenu, 1 UserOutlined if state.user is null", function () {
    const wrapper = shallow(<MainContainer />);
    wrapper.setState({ user: null });
    expect(wrapper.find(MainMenu)).toHaveLength(1);
    expect(wrapper.find(ModalMenu)).toHaveLength(1);
    expect(wrapper.find(UserOutlined)).toHaveLength(1);
  });

  it("should render 1 MainMenu, 1 ModalMenu, 1 DatabaseOutlined, 1 PlusCircleOutlined if state.projectName is null", function () {
    const wrapper = shallow(<MainContainer />);
    wrapper.setState({ user: "TEST_USER", projectName: null });
    expect(wrapper.find(MainMenu)).toHaveLength(1);
    expect(wrapper.find(ModalMenu)).toHaveLength(1);
    expect(wrapper.find(DatabaseOutlined)).toHaveLength(1);
    expect(wrapper.find(PlusCircleOutlined)).toHaveLength(1);
  });

  it("should render 1 MainMenu, 1 ProjectMenu, 1 ImageContainer, 1 ModalMenu if state.projectName and state.user are not null", function () {
    const wrapper = shallow(<MainContainer />);
    wrapper.setState({ user: "TEST_USER", projectName: "TEST_PROJECT_NAME" });
    expect(wrapper.find(MainMenu)).toHaveLength(1);
    expect(wrapper.find(ProjectMenu)).toHaveLength(1);
    expect(wrapper.find(ImageContainer)).toHaveLength(1);
    expect(wrapper.find(ModalMenu)).toHaveLength(1);
  });

  it("should render ImageBoxes equal to the length of state.imageBoxes", function () {
    var imageBoxes_test = [];
    const wrapper = shallow(<MainContainer />);
    wrapper.setState({
      user: "TEST_USER",
      projectName: "TEST_PROJECT_NAME",
      imageBoxes: imageBoxes_test,
    });
    expect(wrapper.find(ImageBoxListItem)).toHaveLength(0);

    imageBoxes_test = [
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
    wrapper.setState({ imageBoxes: imageBoxes_test });
    expect(wrapper.find(ImageBoxListItem)).toHaveLength(2);
  });
});
