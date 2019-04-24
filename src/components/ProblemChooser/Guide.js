import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";
import ButtonBases from "./ButtonBases";
import ProblemTypes from "./PropLogicInput";

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

class Guide extends React.Component {

  data = require("./guide-data.json");
  topics = [];
  steps = ["Choose Problem Topic","Choose Problem Solution Type","Enter your problem!"];

  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      topic: "",
      problemType: "",
      textFieldDefault: ""
    };

    for (var key in this.data) {
      this.topics.push({
        url: this.data[key].URL,
        title: key
      });
    }
  }

  getContent = (activeStep) => {
    if (activeStep === 0){
      return ( 
        <Grid container sm>
          <Paper style={pstyles.Paper}>
            <ButtonBases 
              handler={this.pickTopic}
              images={this.topics}
            />
          </Paper>
        </Grid>
      );
    }
    if (activeStep === 1){
      return (
        <Paper style={pstyles.Paper}>
          <ProblemTypes 
            handlerType={this.pickProblemType}
            problemTypes={this.getProblemTypes()}
          />
        </Paper>
      );
    }
  }

  getProblemTypes = () => {
    const { topic } = this.state;
    var problemTypes = [];
    for (var key in this.data[topic].ProblemTypes) {
      problemTypes.push({
        title: key,
        problem: this.data[topic].ProblemTypes[key].SampleProblems[0]
      });
    }
    return problemTypes;
  }

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
    const { activeStep, textFieldDefault } = this.state;
    const { onTextChange } = this.props;
    this.setState({
      activeStep: activeStep-1,
      textFieldDefault: textFieldDefault.substring(0, textFieldDefault.lastIndexOf("#"))
    });
    onTextChange(textFieldDefault.substring(0, textFieldDefault.lastIndexOf("#")));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  pickProblemType = (data) => {
    const { title: type, description: sampleProblem } = data;
    const { activeStep, textFieldDefault } = this.state;
    const { onTextChange } = this.props;
    this.setState({
      activeStep: activeStep + 1,
      problemType: type,
      textFieldDefault: textFieldDefault + "#"+ type + "\n#"+ sampleProblem
    });
    onTextChange(textFieldDefault + "#"+ type + "\n#"+ sampleProblem);
  };

  pickTopic = (index) => {
    const { activeStep, textFieldDefault } = this.state;
    const { onTextChange } = this.props;
    this.setState({
      activeStep: activeStep + 1,
      topic: this.topics[index].title,
      textFieldDefault: textFieldDefault + "#"+ this.topics[index].title + "\n"
    });
    onTextChange(textFieldDefault + "#"+ this.topics[index].title + "\n");
  };

  onSubmit = (text) => {
    const { changeHandler } = this.props;
    const map = {
      "#Propositional Logic": 0,
      "#Binary Relations":1
    };

    if(text === "#Propositional Logic")
    {
      //0 is for propositional logic
      this.handler(map[text]);
    }
    else if(text === "#Binary Relations")
    {
      //1 is for binary relation
      this.handler(1);
    }
    else if(text.includes("#Propositional Logic #Prove"))
    {
      let textArray = text.split('#');
      changeHandler(textArray[3],"");
    }
  };

  render() {
    const { classes } = this.props;
    const steps = this.steps;
    const { activeStep, textFieldDefault } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
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
              <Typography className={classes.instructions}>{steps[activeStep]}</Typography>
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
                {this.getContent(activeStep)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Guide);
