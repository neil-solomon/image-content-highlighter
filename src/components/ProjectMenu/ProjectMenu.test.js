import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ProjectMenu from "./ProjectMenu.js";
import { Modal } from "antd";

Enzyme.configure({ adapter: new Adapter() });

describe("ProjectMenu", function () {
  it("should have the hightlightColor in the color input and display the project name", function () {
    const wrapper = shallow(
      <ProjectMenu projectName="TEST_PROJECT" highlightColor="#aabbcc" />
    );
    expect(
      wrapper.find('[data-test="highlightColorInput"]').get(0).props.value
    ).toEqual("#aabbcc");
    expect(wrapper.find('[data-test="projectName"]').text()).toEqual(
      "TEST_PROJECT"
    );
  });

  it("should show the get code modal only if getCodeModalVisible is true", function () {
    var wrapper = shallow(
      <ProjectMenu
        projectName="TEST_PROJECT"
        highlightColor="#aabbcc"
        getCodeModalVisible={false}
      />
    );
    expect(wrapper.find(Modal).get(0).props.visible).toEqual(false);

    wrapper = shallow(
      <ProjectMenu
        projectName="TEST_PROJECT"
        highlightColor="#aabbcc"
        getCodeModalVisible={true}
      />
    );
    expect(wrapper.find(Modal).get(0).props.visible).toEqual(true);
  });
});
