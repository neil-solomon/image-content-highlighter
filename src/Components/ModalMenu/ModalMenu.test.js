import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Modal } from "antd";
import ModalMenu from "./ModalMenu.js";
import ModalMenuAccount from "../ModalMenuAccount";
import ModalMenuNewProject from "../ModalMenuNewProject";
import ModalMenuProjects from "../ModalMenuProjects";
import ModalMenuGetCode from "../ModalMenuGetCode";

Enzyme.configure({ adapter: new Adapter() });

describe("ModalMenu", function () {
  it("should not be visble when menuView is all false", function () {
    var wrapper = shallow(
      <ModalMenu menuView={[false, false, false, false]} />
    );
    expect(wrapper.find(Modal).get(0).props.visible).toEqual(false);
  });

  it("should be visible and render the proper modal title and modal child when menuView is not all false", function () {
    var wrapper = shallow(<ModalMenu menuView={[true, false, false, false]} />);
    expect(wrapper.find(Modal).get(0).props.visible).toEqual(true);
    expect(wrapper.find(Modal).get(0).props.title).toEqual("My Account");
    expect(wrapper.find(ModalMenuAccount)).toHaveLength(1);

    wrapper = shallow(<ModalMenu menuView={[false, true, false, false]} />);
    expect(wrapper.find(Modal).get(0).props.visible).toEqual(true);
    expect(wrapper.find(Modal).get(0).props.title).toEqual("New Project");
    expect(wrapper.find(ModalMenuNewProject)).toHaveLength(1);

    wrapper = shallow(<ModalMenu menuView={[false, false, true, false]} />);
    expect(wrapper.find(Modal).get(0).props.visible).toEqual(true);
    expect(wrapper.find(Modal).get(0).props.title).toEqual("My Projects");
    expect(wrapper.find(ModalMenuProjects)).toHaveLength(1);

    wrapper = shallow(<ModalMenu menuView={[false, false, false, true]} />);
    expect(wrapper.find(Modal).get(0).props.visible).toEqual(true);
    expect(wrapper.find(Modal).get(0).props.title).toEqual("Get The Code");
    expect(wrapper.find(ModalMenuGetCode)).toHaveLength(1);
  });
});
