import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import style from "./ProblemSolutionPage.style";
import solver from "../../libs/wolfram/solver";
import ProblemInput from "../ProblemInput/index";
import SolutionStepper from "../SolutionStepper/SolutionStepper";

class ProblemSolutionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepList: [],
      textField: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      textField: nextProps.textField,
    });
  }

    onSubmit = (problemTeX) => {
      solver(problemTeX)
        .then((stepList) => {
          this.setState({ stepList });
        });
    }

    render() {
      const { stepList, textField } = this.state;
      // const { textField } = this.props;
      return (
        <div>

          {/* <HorizontalLinearStepper /> */}

          <ProblemInput textField={textField} onSubmit={this.onSubmit} />
          <SolutionStepper stepList={stepList} />
        </div>
      );
    }
}

ProblemSolutionPage.propTypes = {
  textField: PropTypes.string.isRequired,
};

export default withStyles(style)(ProblemSolutionPage);
