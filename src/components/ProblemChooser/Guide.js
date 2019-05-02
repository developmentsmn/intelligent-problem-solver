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
import SampleProblems from "./SampleProblemDisp";
import { formatProblemAsJSON } from "../../libs/wolfram/text-replace";
import Page from "../Page/ScrollPaper";

const pstyles = {
  Paper: {
    padding: 20, marginTop: 10, marginBottom: 50, width: "100%",maxWidth: "700px", marginLeft: "auto", marginRight: "auto",
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
    fontSize: theme.spacing.unit * 3
  },
});

class Guide extends React.Component {

  data = require("./guide-data.json");
  topics = [];
  steps = ["Pick a Topic","Pick a Problem Type","Define Your Problem"];

  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      topic: "",
      problemType: "",
      problemDefinition: null,
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
        <Grid container>
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
    if (activeStep >= 2){
      const { topic, problemType } = this.state;
      return (
        <Paper style={pstyles.Paper}>
          <SampleProblems 
            handler={this.customizeProblem}
            problemsArray={this.data[topic].ProblemTypes[problemType].SampleProblems}
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
    const { activeStep } = this.state;
    const { onTextChange } = this.props;
    this.setState({
      activeStep: activeStep-1,
    }, () => {
      onTextChange(this.getTextFromState());
    });
  };

  handleReset = () => {
    const { onTextChange } = this.props;
    this.setState({
      activeStep: 0,
    }, () => {
      onTextChange(this.getTextFromState());
    });
  };

  getTextFromState = () => {
    const { activeStep, topic, problemType, problemDefinition } = this.state;
    var text = "";
    if (activeStep === 0){
    } else if (activeStep === 1){
      text = text + "#" + topic + " ";
    } else if (activeStep === 2){
      text = text + "#" + topic + " #" + problemType + "\n" + formatProblemAsJSON(null);
    } else {
      text = text + "#" + topic + " #" + problemType + "\n" + formatProblemAsJSON(problemDefinition);
      this.setState({
        activeStep: activeStep-1,
      });
    }
    return text;
  }

  customizeProblem = (problemAttrs) => {
    const { activeStep } = this.state;
    const { onTextChange } = this.props;
    const { description: problem} = problemAttrs;
    this.setState({
      activeStep: activeStep+1,
      problemDefinition: problem,
    }, () => {
      onTextChange(this.getTextFromState());
    });
  }

  pickProblemType = (data) => {
    const { title: type } = data;
    const { activeStep }= this.state;
    const { onTextChange } = this.props;
    this.setState({
      activeStep: activeStep + 1,
      problemType: type,
    }, () => {
      onTextChange(this.getTextFromState());
    });
  };

  pickTopic = (index) => {
    const { activeStep } = this.state;
    const { onTextChange } = this.props;
    this.setState({
      activeStep: activeStep + 1,
      topic: this.topics[index].title,
    }, () => {
      onTextChange(this.getTextFromState());
    });
  };

  render() {
    const { classes } = this.props;
    const steps = this.steps;
    const { activeStep } = this.state;

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
            <div>
              <Typography className={classes.instructions}>{steps[activeStep]}</Typography>
              <div style={{marginBottom:"24px"}}>

                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                  Back
                </Button>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleReset}
                  className={classes.button}
                  color="secondary"
                  variant="contained"
                >
                  Reset
                </Button>
                
              </div>
              <Page>
                {this.getContent(activeStep)}
              </Page>
            </div>
          
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Guide);
