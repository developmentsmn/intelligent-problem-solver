import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import styles from "./ProblemTextField.style";
import {decodeWolfram} from "../../../libs/wolfram/text-replace";

class ProblemTextField extends Component {
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
    const {
      classes, value, onChange
    } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          key="ProblemTextField"
          label="Problem"
          multiline
          rows="4"
          value={value}
          onChange={(e) => {
            var cursorStart = e.target.selectionStart;
            var cursorEnd = e.target.selectionEnd;
            const { text, lenOffset : stepBack } = decodeWolfram(e.target.value);
            e.target.value = text;
            e.target.setSelectionRange(cursorStart + stepBack, cursorEnd + stepBack);
            onChange(e);
          }}
          InputProps={{
            classes: {
              root: classes.textField
            },
          }}
          fullWidth
          variant="outlined"
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProblemTextField);
