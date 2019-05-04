import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Keyboard from "react-simple-keyboard";
import Button from "@material-ui/core/Button";
import style from "./index.style";
import ProblemTextField from "./ProblemTextField/ProblemTextField";
import "react-simple-keyboard/build/css/index.css";
import "./index.style.css";

class VirtualKeyboard extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    onSubmit: PropTypes.func,
    value: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onSubmit: () => {},
  }

  state = {
    layoutName: "default",
    input: this.props.textField,
  };

  componentDidUpdate(){
    console.log(this.keyboard);
    this.keyboard.keyboard.setInput(this.props.value);
  }

  onChange = (input) => {
    this.keyboard.setInput(input);
    this.props.onChange(input);
  };

  onKeyPress = (button) => {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{Letters}" || button === "{Math}") this.handleShift();
  };

  handleShift = () => {
    const { layoutName } = this.state;

    this.setState({
      layoutName: layoutName === "default" ? "letters" : "default",
    });
  };

  onChangeInput = (event) => {
    this.keyboard.setInput(input);
    const input = event.target.value;
    this.props.onChange(input);
  };

  render() {
    const { classes, onSubmit, value } = this.props;
    const { layoutName } = this.state;

    return (

      <div className={classes.root}>
        <div>
          <img 
            src = "https://firebasestorage.googleapis.com/v0/b/intelligentproblemsolver.appspot.com/o/Logo.png?alt=media&token=dbc07b79-53c9-4581-914f-a34344eced57"
            alt="new"
            style={{width:"90%", height:"125px"}}/>
        </div>

        <div className={classes.TextField}>

          <ProblemTextField
            value={value}
            onChange={e => this.onChangeInput(e)}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div> 
        <Keyboard
          ref={(r) => { this.keyboard = r; return r; }}
          onChange={inputKB => this.onChange(inputKB)}
          onKeyPress={button => this.onKeyPress(button)}
          theme="hg-theme-default hg-layout-default myTheme"
          layoutName={layoutName}
          display={{
            "{Letters}": "Letters",
            "{Math}": "Math",
            "{bksp}": "←",
          }}
          layout={{
            default: [
              "0 1 2 3 4 5 6 7 8 9 {bksp}",
              "¬ ∧ ∨ ⇒ ⇔ { } ( ) ,",
              "{Letters} A B C D E F"
            ],
            letters: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              "{lock} A S D F G H J K L : \" {enter}",
              "{Math} Z X C V B N M < > ?",
              ".com @ {space}",
            ],
          }}
          buttonTheme={[
            {
              class: "hg-red",
              buttons: "Q W R T Y q w r t y",
            },
            {
              class: "hg-highlight",
              buttons: "Q q",
            },
          ]}
          className={classes.Keyboard}
        />
      </div>
    );
  }
}

export default withStyles(style)(VirtualKeyboard);
