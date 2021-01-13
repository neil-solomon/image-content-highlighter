import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ProjectList from "./ProjectList.js";

Enzyme.configure({ adapter: new Adapter() });

describe("ProjectList", function () {
  it("should render the projectName of each project", () => {
    var test_newProjectName = "TEST_PROJECT_NAME";
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

    var wrapper = shallow(
      <ProjectList
        newProjectName={test_newProjectName}
        projects={test_projects}
      />
    );

    expect(wrapper.find('[data-test="ProjectList_project0"]').text()).toEqual(
      "testProject1"
    );
    expect(wrapper.find('[data-test="ProjectList_project1"]').text()).toEqual(
      "testProject2"
    );
  });

  it("should render create new project button enabled only if newProjectName isn't blank", () => {
    var test_projects = [];
    var test_newProjectName = "";

    var wrapper = shallow(
      <ProjectList
        newProjectName={test_newProjectName}
        projects={test_projects}
      />
    );

    expect(
      wrapper.find('[data-test="ProjectList_newProjectButton"]').get(0).props
        .disabled
    ).toEqual(true);

    test_newProjectName = "TEST_NEW_PROJET_NAME";

    wrapper = shallow(
      <ProjectList
        newProjectName={test_newProjectName}
        projects={test_projects}
      />
    );

    expect(
      wrapper.find('[data-test="ProjectList_newProjectButton"]').get(0).props
        .disabled
    ).toEqual(false);
  });

  it("should have newProjectName displayed in the create new project input", () => {
    var test_projects = [];
    var test_newProjectName = "TEST_NEW_PROJET_NAME";

    var wrapper = shallow(
      <ProjectList
        newProjectName={test_newProjectName}
        projects={test_projects}
      />
    );

    expect(
      wrapper.find('[data-test="ProjectList_newProjectNameInput"]').get(0).props
        .value
    ).toEqual("TEST_NEW_PROJET_NAME");
  });
});
