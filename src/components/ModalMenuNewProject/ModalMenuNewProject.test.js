import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ModalMenuNewProject from "./ModalMenuNewProject.js";

Enzyme.configure({ adapter: new Adapter() });

describe("ModalMenuNewProject", function () {
  it("should render", () => {
    const wrapper = shallow(<ModalMenuNewProject />);
  });
});
