import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Guide from "./Guide";
import TextField from "../ProblemInput/index";
import { encodeWolfram } from "../../libs/wolfram/text-replace";

const styles = theme => ({
  root: {
    Width: "100%",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    // maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
});

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      text: "",
      tutorialSteps: [
        {
          content: <div style={{ display: "flex", justifyContent: "center", width: "100%"}}>
            <Guide onTextChange = {this.handleTextChange}/>
          </div>,
        },
        {
          content: <div/>,
        },
      ],
    };
  }

  data = require("./guide-data.json");

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = (activeStep) => {
    this.setState({ activeStep });
  };

  handleTextChange = (text) => {
    this.setState({ text });
  };

  parseText = (text) => {
    text = text.replace("\n", "#");
    var arr = text.split("#");
    if (arr.length < 4)
      return undefined;

    const parseProblem = (problemText) => {
      let fromIndex = 0;
      let colonIndex = problemText.indexOf(":", fromIndex);
      let res = {};
      while (colonIndex !== -1){
        let newlineIndex = problemText.indexOf("\n", colonIndex);
        if (newlineIndex === -1)
          newlineIndex = problemText.length;
        let key = problemText.substring(fromIndex, colonIndex).trim();
        let value = encodeWolfram(problemText.substring(colonIndex+1, newlineIndex).trim());
        res[key] = value;
        fromIndex = newlineIndex + 1;
        colonIndex = problemText.indexOf(":", fromIndex);
      }
      return res;
    };

    const res = {
      topic: arr[1].trim(),
      problemType: arr[2].trim(),
      problemDefinition: parseProblem(arr[3].trim())
    };
    return res;
  }

  onSubmit = () => {
    const { text } = this.state;
    const { onExplain } = this.props;
    const submissionInfo = this.parseText(text);
    if (submissionInfo === undefined)
      return;
    const { topic, problemType, problemDefinition } = submissionInfo;
    const link = this.data[topic].ProblemTypes[problemType].Link;

    const submitToWolfram = async (problem, link) => {
      const result = await axios.get(link, {
        params: {
          problem
        },
      });
      return {
        Success: result.data.Success,
        Result: result.data.Result
      };
    };

    submitToWolfram(problemDefinition, link)
    .then(res => {
      if (res.Success === false)
        return new Promise((resolve, reject) => reject("Error fetching results from Wolfram."));
      else {
        const { tutorialSteps } = this.state;
        console.log("../../components/SolutionDisplay/"+topic+"/"+problemType);
        import("../../components/SolutionDisplay/"+topic+"/"+problemType)
        .then(component => {
          const SolutionPanel = component.default;
          tutorialSteps[1].content = (
            <SolutionPanel 
              onExplain={onExplain} 
              dataString={res.Result}
            />
          );
          this.setState({activeStep: 1,tutorialSteps});
        })
        .catch(err => {
          tutorialSteps[1].content = <h1>This solver is not available at this time.</h1>;
          this.setState({activeStep: 1,tutorialSteps});
        })
        tutorialSteps[1].content = <h1>Loading results...</h1>;
        this.setState({activeStep: 1,tutorialSteps});
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const { classes, theme } = this.props;
    const { activeStep, tutorialSteps, text } = this.state;
    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <TextField 
          value={text} 
          onChange={this.handleTextChange}
          onSubmit={this.onSubmit}
        />
        <SwipeableViews
          style={{ width: "100%", minWidth:"700px"}}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
        >
          {tutorialSteps.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div className={classes.img}>{step.content}</div>
              ) : null}
            </div>
          ))}
        </SwipeableViews>

        <MobileStepper
          steps={maxSteps}
          position="bottom"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={(
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Solution Page
              {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )}
          backButton={(
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Problem Guide
            </Button>
          )}
        />
      </div>
    );
  }
}

Carousel.propTypes = {
  classes: PropTypes.shape().isRequired,
  theme: PropTypes.shape().isRequired,
};

export default withStyles(styles, { withTheme: true })(Carousel);
