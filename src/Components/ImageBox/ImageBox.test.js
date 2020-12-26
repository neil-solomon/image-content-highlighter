import React from "react";
import { render } from "@testing-library/react";
import ImageBox from "./ImageBox";

test("renders an ImageBox with boxNumber 1 and height 100px", () => {
  const { getByText } = render(
    <ImageBox boxNumber={0} highlightColor="rgb(0,0,0)" height={100} />
  );
  const imageBox = getByText("1");
  expect(imageBox).toBeInTheDocument();
  expect(imageBox.style.height).toBe("100px");
});
