import React from "react";
import ReactDOM from "react-dom";
import ProblemInput from "../index";

jest.mock("react-simple-keyboard", () => jest.fn(() => (<div id="keyboard" />)));

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ProblemInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});
