import React, { Component } from 'react';
import ProbTypeCard from './ProbTypeCard';


class PropLogicInput extends Component {

  render() {
    return (
      <div>
          <ProbTypeCard 
            title="Prove"
            description={{
              Hyp: "{A, B => C}", 
              Goal: "{B}"
            }}
            handlerType={this.props.handlerType}
            index={0}
          />
          <ProbTypeCard 
            title="Simplification"
            description={{
              Hyp: "{A => B => C, B}", 
              Goal: "{B}"
            }}
            handlerType={this.props.handlerType}
            index={1}
          />
      </div>
           
    )
  }
}

export default PropLogicInput;