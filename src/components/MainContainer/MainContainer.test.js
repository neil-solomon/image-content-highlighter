import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainContainer from "./MainContainer";
import ProjectMenu from "../ProjectMenu";
import ImageContainer from "../ImageContainer";
import ImageBoxListItem from "../ImageBoxListItem";
import MainMenu from "../MainMenu";
import AuthMenu from "../AuthMenu";

import { AuthState } from "@aws-amplify/ui-components";

Enzyme.configure({ adapter: new Adapter() });

describe("MainContainer", function () {
  it("should render 1 MainMenu, 1 AuthMenu if user is not signed in", function () {
    const wrapper = shallow(<MainContainer />);
    var test_user = null;
    var test_authState = AuthState.SignedOut;
    wrapper.setState({ test_user: null, authState: test_authState });
    expect(wrapper.find(MainMenu)).toHaveLength(1);
    expect(wrapper.find(AuthMenu)).toHaveLength(1);
  });

  // it("should render 1 MainMenu, 1 AuthMenu", function () {
  //   const wrapper = shallow(<MainContainer />);
  //   wrapper.setState({ user: "TEST_USER", projectName: null });
  //   expect(wrapper.find(MainMenu)).toHaveLength(1);
  //   expect(wrapper.find(ModalMenu)).toHaveLength(1);
  //   expect(wrapper.find(DatabaseOutlined)).toHaveLength(1);
  //   expect(wrapper.find(PlusCircleOutlined)).toHaveLength(1);
  // });

  it("should render ImageBoxes equal to the length of imageBoxes in the selected project", function () {
    var test_projects = [
      {
        name: "testProject1",
        highlightColor: "#aa9901",
        imageBoxes: [
          {
            active: false,
            topLeft: [0, 0],
            bottomRight: [50, 50],
            displayText: "test",
            clickUrl: "http://www.test.com",
            clickTarget: "_self",
          },
        ],
        imageSrc: "",
        imageHeight: 0,
        imageWidth: 0,
      },
      {
        name: "testProject2",
        highlightColor: "#cc1155",
        imageBoxes: [
          {
            active: false,
            topLeft: [50, 50],
            bottomRight: [100, 100],
            displayText: "test2",
            clickUrl: "http://www.test2.com",
            clickTarget: "_self",
          },
          {
            active: false,
            topLeft: [150, 150],
            bottomRight: [200, 200],
            displayText: "test3",
            clickUrl: "http://www.test3.com",
            clickTarget: "_self",
          },
        ],
        imageSrc: "",
        imageHeight: 0,
        imageWidth: 0,
      },
    ];
    var test_user = { attributes: { email: "user@test.com" } };
    var test_authState = AuthState.SignedIn;

    var test_currentProjectIndex = 0;
    var wrapper = shallow(<MainContainer />);
    wrapper.setState({
      authState: test_authState,
      user: test_user,
      projects: test_projects,
      currentProjectIndex: test_currentProjectIndex,
    });
    expect(wrapper.find(ImageBoxListItem)).toHaveLength(1);

    var test_currentProjectIndex = 1;
    var wrapper = shallow(<MainContainer />);
    wrapper.setState({
      authState: test_authState,
      user: test_user,
      projects: test_projects,
      currentProjectIndex: test_currentProjectIndex,
    });
    expect(wrapper.find(ImageBoxListItem)).toHaveLength(2);
  });
});
