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
    textField: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onSubmit: () => {},
  }

  state = {
    layoutName: "default",
    input: this.props.textField,
    textField: this.props.textField,
  };

  
  componentWillReceiveProps(nextProps) {
    if(nextProps.textField !== this.props.textField)
    {
      this.setState({
        input: nextProps.textField,
        textField: nextProps.textField,
      },() => console.log(this.state.input));
    }
    
  }
  

  onChange = (input) => {
    this.setState({
      input,
    });
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
    const input = event.target.value;
    this.setState(
      {
        input,
      },
      () => {
        this.keyboard.setInput(input);
      },
    );
  };

  textFieldHandler = (event) => {
    this.setState({ textField: event });
  }

  render() {
    const { classes, onSubmit } = this.props;
    const { input, layoutName, textField } = this.state;

    return (
      <div>
        <ProblemTextField
          value={input}
          onChange={e => this.onChangeInput(e)}
          textField={textField}
          textFieldHandler={this.textFieldHandler}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            onSubmit(input);
          }}
        >
          Submit

        </Button>
        <Keyboard
          ref={(r) => { this.keyboard = r; return r; }}
          onChange={inputKB => this.onChange(inputKB)}
          onKeyPress={button => this.onKeyPress(button)}
          theme="hg-theme-default hg-layout-default myTheme"
          layoutName={layoutName}
          display={{
            "\\land": "∧",
            "\\lor": "∨",
            "\\Rightarrow": "⇒",
            "\\Leftrightarrow": "⇔",
            "\\neg": "¬",
            "{Letters}": "Letters",
            "{Math}": "Math",
            "{bksp}": "←",
          }}
          layout={{
            default: [
              "A B C D E F {bksp}",
              "\\neg \\land \\lor \\Rightarrow \\Leftrightarrow",
              "{Letters} { } ( )",
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
        />
      </div>
    );
  }
}

export default withStyles(style)(VirtualKeyboard);
