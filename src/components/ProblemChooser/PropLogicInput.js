import React, { Component } from "react";
import PropTypes from "prop-types";
import ProbTypeCard from "./ProbTypeCard";


class PropLogicInput extends Component {
  static propTypes = {
    handlerType: PropTypes.func.isRequired,
  }

  render() {
    const { handlerType } = this.props;

    return (
      <div>
        <ProbTypeCard
          icon="./imagelocation"
          title="Prove"
          description={{
            Hyp: "{A, B => C}",
            Goal: "{B}",
          }}
          handlerType={handlerType}
          index={0}
        />
        <ProbTypeCard
          icon="nothing"
          title="Simplification"
          description={{
            Hyp: "{A => B => C, B}",
            Goal: "{B}",
          }}
          handlerType={handlerType}
          index={1}
        />
      </div>

    );
  }
}

export default PropLogicInput;
