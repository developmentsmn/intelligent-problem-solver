import React, { Component } from "react";
import PropTypes from "prop-types";
import DisplayProblemBox from "./ProbTypeCard";

class DisplayProblem extends Component {
  static propTypes = {
    // handlerType: PropTypes.func.isRequired,
    problemsArray: PropTypes.arrayOf(PropTypes.any)
  }

  render() {
    // const { handlerType, problemSamples } = this.props;
    const { handler, problemsArray } = this.props;

    return (
      <div>
        {
          problemsArray.map((prob, index) =>
            <DisplayProblemBox
            //   icon={prob.icon}
            //   title={prob.title}
            //   description={prob.problem}
                handlerType={handler}
                description = {prob}
                index={index}
            />
          )
        }
      </div>

    );
  }
}

export default DisplayProblem;
