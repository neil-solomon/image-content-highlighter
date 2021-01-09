import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ModalMenuGetCode from "./ModalMenuGetCode.js";

Enzyme.configure({ adapter: new Adapter() });

describe("ModalMenuGetCode", function () {
  it("should render", () => {
    const wrapper = shallow(<ModalMenuGetCode />);
  });
});
