import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ImageContainer from "./ImageContainer.js";
import ImageBox from "../ImageBox";

Enzyme.configure({ adapter: new Adapter() });

describe("ImageContainer", function () {
  it("should render 0 ImageBox first, then 2 after props.imageBoxes is set", function () {
    const imageBoxes_test = [
      {
        boxNumber: 0,
        topLeft: [0, 0],
        bottomRight: [100, 100],
        displayText: "box 1",
      },
      {
        boxNumber: 1,
        topLeft: [150, 150],
        bottomRight: [300, 300],
        displayText: "box 2",
      },
    ];

    var wrapper = shallow(
      <ImageContainer
        imageBoxes={[]}
        imageWidth={100}
        imageHeight={100}
        imageSrc={""}
        highlightColor={"#aabbcc"}
      />
    );
    expect(wrapper.find(ImageBox)).toHaveLength(0);

    wrapper = shallow(
      <ImageContainer
        imageBoxes={imageBoxes_test}
        imageWidth={100}
        imageHeight={100}
        imageSrc={""}
        highlightColor={"#aabbcc"}
      />
    );
    expect(wrapper.find(ImageBox)).toHaveLength(2);
  });
});
