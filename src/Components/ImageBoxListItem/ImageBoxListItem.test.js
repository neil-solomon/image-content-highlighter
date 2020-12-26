import React from "react";
import { render } from "@testing-library/react";
import ImageBoxListItem from "./ImageBoxListItem";

test("renders an ImageBoxListItem with boxNumber 1 and height 25px", () => {
  const { getByText } = render(
    <ImageBoxListItem boxNumber={0} active={false} />
  );
  const imageBoxListItem = getByText("Highlight Box #1");
  expect(imageBoxListItem).toBeInTheDocument();
});
