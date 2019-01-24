import React, { Component } from "react";
import Page from "../../components/Page/Page";
import HorizontalLinearStepper from "../../components/ProblemChooser/HorizontalLinearStepper";

class LogicProof extends Component {
  render() {
    return (
      <Page>
        <HorizontalLinearStepper/>
      </Page>
    );
  }
}

export default LogicProof;
