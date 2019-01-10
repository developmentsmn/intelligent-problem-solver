import React, { Component } from "react";
import PropTypes from 'prop-types';
import style from './index.style';
import {withStyles} from '@material-ui/core/styles';
import Keyboard from "react-simple-keyboard";
import Button from '@material-ui/core/Button';
import ProblemTextField from "./ProblemTextField/ProblemTextField";
import "react-simple-keyboard/build/css/index.css";
import './index.style.css';

class VirtualKeyboard extends Component {
	static propTypes = {
		classes: PropTypes.shape().isRequired,
		onSubmit: PropTypes.func,
	}

	static defaultProps = {
		onSubmit: () => {},
	}

  state = {
    layoutName: "default",
    input: ""
  };

  onChange = input => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{Letters}" || button === "{Math}") this.handleShift();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "letters" : "default"
    });
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboard.setInput(input);
      }
    );
  };

  render() {
		const { classes, onSubmit } = this.props;
		const { input } = this.state;
    return (
      <div>
        <ProblemTextField
          value={input}
          onChange={e => this.onChangeInput(e)}
        />
				<Button variant="contained" color="primary" className={classes.button}
				onClick={() => {onSubmit(input)}}>
        	Submit
      	</Button>	
        <Keyboard
          ref={r => (this.keyboard = r)}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
          theme={"hg-theme-default hg-layout-default myTheme"}
          layoutName={this.state.layoutName}
          display={{
            '\\land': '∧',
						'\\lor': '∨',
						'\\Rightarrow': '⇒',
						'\\Leftrightarrow':'⇔',
						'\\neg':'¬',
						'{Letters}':'Letters',
						'{Math}':'Math',
						'{bksp}':'←'
          }}
          layout={{
            default: [
							"A B C D E F {bksp}",
              "\\neg \\land \\lor \\Rightarrow \\Leftrightarrow",
              "{Letters} ( ) { }",
            ],
            letters: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              '{lock} A S D F G H J K L : " {enter}',
              "{Math} Z X C V B N M < > ?",
              ".com @ {space}"
            ]
          }}
          buttonTheme={[
            {
              class: "hg-red",
              buttons: "Q W E R T Y q w e r t y"
            },
            {
              class: "hg-highlight",
              buttons: "Q q"
            }
          ]}
        />
      </div>
    );
  }
}

export default withStyles(style)(VirtualKeyboard);
