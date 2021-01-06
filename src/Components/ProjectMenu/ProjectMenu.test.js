import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ProjectMenu from "./ProjectMenu.js";

Enzyme.configure({ adapter: new Adapter() });

describe("ProjectMenu", function () {
  it("should have the hightlightColor of props in the color input", function () {
    const wrapper = shallow(
      <ProjectMenu filename="filename_test" highlightColor="#aabbcc" />
    );
    expect(
      wrapper.find('[data-test="highlightColorInput"]').get(0).props.value
    ).toEqual("#aabbcc");
  });
});
