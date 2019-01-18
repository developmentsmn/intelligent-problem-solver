import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './ProblemSolutionPage.style';
import solver from '../../libs/wolfram/solver';
import ProblemInput from '../ProblemInput/index';
import SolutionStepper from '../SolutionStepper/SolutionStepper';

class ProblemSolutionPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			stepList: [],
		}
	}

	onSubmit = (problemTeX) => {
		solver(problemTeX)
		.then(stepList => {
			this.setState({stepList});
		})
		.catch(error => {
			console.log(error);
		})
	}

	render(){
		const { stepList } = this.state;
		console.log(stepList);
		return (
			<div>
				<ProblemInput onSubmit={this.onSubmit}/>
				<SolutionStepper stepList={stepList}/>
			</div>
		)
	}
}

export default withStyles(style)(ProblemSolutionPage);