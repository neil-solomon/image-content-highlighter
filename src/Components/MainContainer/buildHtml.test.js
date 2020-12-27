import React from "react";
import { render } from "@testing-library/react";
import buildHtml from "./buildHtml";

test("checks the output of buildHtmlw", () => {
  const filename = "test_filename0";
  const imageBoxes = [
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

  const element = buildHtml(filename, imageBoxes);
  expect(element.innerHTML.includes("<script>")).toBe(true);
  expect(element.innerHTML.includes("<style>")).toBe(true);
  expect(element.innerHTML.includes("box 1")).toBe(true);
});
