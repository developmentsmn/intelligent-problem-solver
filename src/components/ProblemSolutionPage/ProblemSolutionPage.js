import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import style from "./ProblemSolutionPage.style";
import solver from "../../libs/wolfram/solver";
import ProblemInput from "../ProblemInput/index";
import SolutionStepper from "../SolutionStepper/SolutionStepper";
import {encodeWolfram} from "../../libs/wolfram/text-replace";

class ProblemSolutionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepList: [],
      textField: props.textField,
      pageValue: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      textField: nextProps.textField,
    });
  }

    onSubmit = (problemTeX) => {
      console.log(problemTeX);

      const terms = problemTeX.split("#");

      var linkData = require('./solverLinks.json')

      var link = undefined;
      //console.log("array:", terms);

      this.setState(({
        pageValue: terms[2]
      }));

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
      
      return (
        <div>

          {/* <HorizontalLinearStepper /> */}
          <SolutionStepper topic={this.state.pageValue} stepList={stepList} />
        </div>
      );
    }
}

ProblemSolutionPage.propTypes = {
  textField: PropTypes.string.isRequired,
};

export default withStyles(style)(ProblemSolutionPage);
