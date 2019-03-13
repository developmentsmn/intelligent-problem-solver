import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import ProblemSolutionPage from "../ProblemSolutionPage/ProblemSolutionPage";
import Guide from "./Guide";


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
    display: "block",
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
      tutorialSteps: [
        {
          content: <div style={{ display: "flex", justifyContent: "center" }}>
            <Guide changeHandler={this.handleNext} />
          </div>,
        },
        {
          content: <ProblemSolutionPage textField="#Propositional Logic #Prove #Enter a problem" />,
        },
      ],
    };

    this.handleNext = this.handleNext.bind(this);
  }

  handleNext = (hyp, goal) => {
    console.log(hyp);
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
      tutorialSteps: [
        {
          content: <div style={{ display: "flex", justifyContent: "center" }}>
            <Guide changeHandler={this.handleNext} />
          </div>,
        },
        {
          content: <ProblemSolutionPage textField={`#Propositional Logic #Prove #${hyp}${goal}`} />,
        },
      ],
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

  render() {
    const { classes, theme } = this.props;
    const { activeStep, tutorialSteps } = this.state;

    /*
    const tutorialSteps = [
      {
        content: <div style={{ display: "flex", justifyContent: "center" }}>
          <Guide changeHandler={this.handleNext} />
        </div>,
      },
      {
        content: <ProblemSolutionPage textField={"#Propositional Logic #Prove #Enter a problem"}/>,
      },
    ];
    */

    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <SwipeableViews
          styles={{ width: "100%" }}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          //enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div className={classes.img}>{step.content}</div>
              ) : null}
            </div>
          ))}
        </SwipeableViews>

        <Button
          style={{
            position: "absolute",
            right: "90%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            transform: "translate3d(-50%,-50%,0)",
          }}
          onClick={this.handleBack}
          disabled={activeStep === 0}
        >
          {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </Button>

        <Button
          style={{
            position: "absolute",
            left: "90%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            transform: "translate3d(-50%,-50%,0)",
          }}
          onClick={this.handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>

        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={(
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )}
          backButton={(
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
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
