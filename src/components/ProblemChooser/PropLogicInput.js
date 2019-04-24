import React, { Component } from "react";
import PropTypes from "prop-types";
import ProbTypeCard from "./ProbTypeCard";

class PropLogicInput extends Component {
  static propTypes = {
    handlerType: PropTypes.func.isRequired,
    problemTypes: PropTypes.arrayOf(PropTypes.any)
  }

  render() {
    const { handlerType, problemTypes } = this.props;

    return (
      <div>
        {
          console.log(problemTypes)
        }
        {
          problemTypes.map((prob, index) =>
            <ProbTypeCard
              icon={prob.icon}
              title={prob.title}
              description={prob.problem}
              handlerType={handlerType}
              index={index}
            />
          )
        }
      </div>

    );
  }
}

export default PropLogicInput;
