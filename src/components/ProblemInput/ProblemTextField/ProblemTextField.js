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
    textField: PropTypes.string.isRequired,
    textFieldHandler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: "",
    onChange: () => {},
  }

  constructor(props) {
    super(props);
    const { textField } = this.props;
    this.state = {
      textFieldDefault: textField,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { textFieldDefault } = this.state;

    if (textFieldDefault !== nextProps.textField) {
      if (!nextProps.textField.includes(undefined)) {
        this.setState({
          textFieldDefault: nextProps.textField,
        });
      } else {
        this.setState({
          textFieldDefault: "#Propositional Logic #Prove #Enter a problem here",
        });
      }
    }
  }


  render() {
    const {
      classes, value, onChange, textFieldHandler,
    } = this.props;
    const { textFieldDefault } = this.state;

    return (
      <div>
        <TextField
          key="ProblemTextField"
          label="Problem"
          multiline
          rows="3"
          value={textFieldDefault}
          onChange={(e) => {
            onChange(e);
            // this.setState({ textFieldDefault: e.target.value });
            // this.props.textField = e.target.value;
            textFieldHandler(decodeWolfram(e.target.value));
          }}
          className={classes.textField}
          fullWidth
          style={{marginLeft: 0, marginRight:0, marginTop:"10px"}}
          variant="outlined"
          // onChange={onChange}
        />
        {/*
        <BlockMath>
          {value}
        </BlockMath>*/}
      </div>
    );
  }
}

/*
ProblemTextField.propTypes = {
  input: PropTypes.string.isRequired,
}; */

export default withStyles(styles)(ProblemTextField);
