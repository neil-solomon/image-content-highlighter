import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ModalMenuAccount from "./ModalMenuAccount.js";

Enzyme.configure({ adapter: new Adapter() });

describe("ModalMenuAccount", function () {
  it("should render", () => {
    const wrapper = shallow(<ModalMenuAccount />);
  });
});
