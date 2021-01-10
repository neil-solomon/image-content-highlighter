import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ModalMenuAuth from "./ModalMenuAuth.js";

Enzyme.configure({ adapter: new Adapter() });

describe("ModalMenuAuth", function () {
  it("should render", () => {
    const wrapper = shallow(<ModalMenuAuth />);
  });
});
