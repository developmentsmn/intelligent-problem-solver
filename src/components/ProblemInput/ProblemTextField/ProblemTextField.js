import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './ProblemTextField.style';
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import { BlockMath } from 'react-katex';

class ProblemTextField extends Component{
	static propTypes = {
		classes: PropTypes.shape().isRequired,
		value: PropTypes.string,
		onChange: PropTypes.func,
	}

	static defaultProps = {
		value: "",
		onChange: () => {},
	}

	render() {
		const { classes, value, onChange } = this.props;
		return (
			<div >
				<TextField
          label="Problem"
          multiline
          rows="3"
					value={value}
					className={classes.textField}
					fullWidth
          margin="normal"
					variant="outlined"
					onChange={onChange}
        />
				<BlockMath>
					{value}
				</BlockMath>
			</div>   
		)
	}
}

export default withStyles(styles)(ProblemTextField);