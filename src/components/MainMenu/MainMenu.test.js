import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainMenu from "./MainMenu.js";
import { UserOutlined } from "@ant-design/icons";

Enzyme.configure({ adapter: new Adapter() });

describe("MainMenu", function () {
  it("should render the web app title and user icon", function () {
    const wrapper = shallow(<MainMenu />);
    expect(wrapper.find('[data-test="MainMenu_title"]').text()).toEqual(
      "Image Mapper"
    );
    expect(wrapper.find(UserOutlined)).toHaveLength(1);
  });
});
