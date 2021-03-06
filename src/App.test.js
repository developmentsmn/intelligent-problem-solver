import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

jest.mock("react-simple-keyboard", () => jest.fn(() => (<div id="keyboard" />)));

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
