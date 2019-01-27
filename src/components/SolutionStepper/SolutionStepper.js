import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { InlineMath } from "react-katex";
import TemporaryDrawer from '../Drawer/TemporaryDrawer';

const styles = theme => ({
  root: {
    width: "90%",
  },
  stepper: {
    textAlign: "left",
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

class VerticalLinearStepper extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    stepList: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  }

  constructor(props) {
    super(props);
    this.state.steps = new Array(props.stepList.length).fill(0).map(
      (x, i) => (`Step ${i + 1}`),
    );
  }

  state = {
    activeStep: 0,
  };

  /* \{ \{A \Rightarrow (B \Rightarrow C), A \lor \neg D,B,D \}, \{C\} \} */
  getStepContent = (step) => {
    const { stepList } = this.props;
    return (
      <div>
        <span>
          Applying
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {stepList[step][2]}
          </span>
          {" "}
          to:
        </span>
        <ul>
          {stepList[step][0].map(item => (
            <li key={item}><InlineMath math={item} /></li>
          ))}
        </ul>
        <span>We got,</span>
        <ul>
          {stepList[step][1].map(item => (
            <li key={item}><InlineMath math={item} /></li>
          ))}
        </ul>
      </div>
    );
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes, stepList } = this.props;
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper classes={{ root: classes.stepper }} activeStep={activeStep} orientation="vertical">
          {stepList.map((item, index) => {
            return (
              <Step key={item}>
                <StepLabel>{`Step ${index + 1}`}</StepLabel>
                <StepContent>
                  {this.getStepContent(index)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Explain
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === stepList.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === stepList.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(VerticalLinearStepper);
