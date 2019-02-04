import React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import ButtonBases from "./ButtonBases";
import PropLogicInput from "./PropLogicInput";


const pstyles = {
  Paper: {
    padding: 20, marginTop: 10, marginBottom: 10, height: 500, width: "50%", marginLeft: "auto", marginRight: "auto",
  },
};

const styles = theme => ({
  root: {
    width: "90%",
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ["Choose Problem Topic", "Choose Problem Solution Type", "Enter your problem!"];
}

function getStepContent(step) {
  switch (step) {
  case 0:
    return "Choose Problem Topic...";
  case 1:
    return "Choose Problem Solution Type";
  case 2:
    return "This is the bit I really care about!";
  default:
    return "Unknown step";
  }
}

class Guide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      skipped: new Set(),
      content:
  <Grid container sm>
    <Paper style={pstyles.Paper}>
      <ButtonBases handler={this.handler} />
    </Paper>
  </Grid>,
      prevContent: [],
      textFieldDefault: "",
      // value: "",
    };

    this.handler = this.handler.bind(this);
  }


  isStepOptional = step => step === -1;

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    const { prevContent, textFieldDefault } = this.state;

    if (prevContent.length === 1) {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
        content: <Grid container sm>
          <Paper style={pstyles.Paper}>
            <ButtonBases handler={this.handler} />
          </Paper>
                 </Grid>,
        prevContent: [],
        textFieldDefault: textFieldDefault.substring(0, textFieldDefault.lastIndexOf("#")),
      }));
    } else {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
        content: state.prevContent[0],
        prevContent: state.prevContent.splice(0, 1),
        textFieldDefault: textFieldDefault.substring(0, textFieldDefault.lastIndexOf("#")),
      }));
    }
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState((state) => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handlerType = (data) => {
    const { prevContent, content } = this.state;
    const { changeHandler } = this.props;

    const temp = _.cloneDeep(prevContent);
    temp.splice(0, 0, content);

    const { index, hyp, goal } = data;

    // simplification === 1
    if (index === 1) {
      this.setState(prevState => ({
        activeStep: prevState.activeStep + 1,
        prevContent: temp,
        content: <h1>SIMPLIFICATION</h1>,
        textFieldDefault: "#Propositional Logic #Simplification",
      }));
    }
    // proof === 0
    else if (index === 0) {
      changeHandler(hyp, goal);

      /*
      this.setState({
        activeStep: this.state.activeStep + 1,
        prevContent: temp,
        content:
        <div>
          <ProblemSolutionPage input={"#Propositional Logic #Prove #{" + hyp + " " + goal + "}"}/>
        </div>,
        textFieldDefault: "#Propositional Logic #Prove" + " " + hyp + " " + goal
      }) */
    }
  };

  handler = (value) => {
    const { prevContent, content } = this.state;

    const temp = prevContent;
    temp.splice(0, 0, content);

    if (value === 0) {
      // chose propositional logic
      this.setState(prevState => ({
        activeStep: prevState.activeStep + 1,
        prevContent: temp,
        content:
  <Paper style={pstyles.Paper}>
    <PropLogicInput pstyles={pstyles} handlerType={this.handlerType} />
  </Paper>,
        textFieldDefault: "#Propositional Logic",
      }));
    } else if (value === 1) {
      // chose binary relation
      this.setState(prevState => ({
        activeStep: prevState.activeStep + 1,
        prevContent: temp,
        content: <h1>BINARY RELATION CHOSEN</h1>,
        textFieldDefault: "#Binary Relation",
      }));
    }
  };

  isStepSkipped(step) {
    const { skipped } = this.state;
    return skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, content, textFieldDefault } = this.state;

    // let content;

    /*
    if(this.state.activeStep === 0)
    {

      content = <Grid container sm>
      <Paper style={pstyles.Paper}>
        <ButtonBases setSlide={i => this.setState({activeStep: activeStep + 1, slide: i})}
        />
      </Paper>
    </Grid>


    }
    else if(this.state.activeStep === 1)
    {
      //TODO: When Back button is chosen, reset slide back to -1 within the state
      if(this.state.slide === 0)
      {
        content = <PropLogicInput pstyles={pstyles} handler={this.handler}/>
      }
      else if(this.state.slide === 1)
      {
        content = <h1>BINARY RELATION CHOSEN</h1>
      }
    }
    */

    let previewField = (null);
    if (activeStep !== 2) {
      previewField = (
        <div style={{
          width: "80%",
          margin: "0 auto",
          position: "relative",
        }}
        >
          <TextField
            key="GuideTextField"
            label="Problem"
            multiline
            rows="3"
            // value={value}
            // className={classes.textField}
            // fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => {
              this.setState({ textFieldDefault: e.target.value });
            }}
            value={textFieldDefault}
            style={{ width: "60%" }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              position: "absolute",
              left: "90%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              transform: "translate3d(-50%,-50%,0)",
            }}
          // className={classes.button}
          // onClick={() => { onSubmit(input); }}
          >
          Submit

          </Button>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        {previewField}
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>

                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                  color="secondary"
                  variant="contained"
                >
                  Back
                </Button>

                {content}


                {this.isStepOptional(activeStep) && (

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

/*
Guide.propTypes = {
  classes: PropTypes.object,
};
*/

export default withStyles(styles)(Guide);
