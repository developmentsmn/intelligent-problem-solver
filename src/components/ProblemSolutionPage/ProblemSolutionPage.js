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
      const terms = problemTeX.split("#");

      var linkData = require('./solverLinks.json')

      var link = undefined;
      //console.log("array:", terms);

      if(terms[1] === "Propositional Logic ")
      {
        const key = "PropositionalLogic";
        if(terms[2] === "Prove ")
        {
          const key2 = "Prove";
          link = linkData[key][key2]
          console.log("link:", link);
          problemTeX = terms[3];
        }
      }
      solver(problemTeX, link)
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
