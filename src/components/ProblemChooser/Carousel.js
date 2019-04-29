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
import SearchDrawer from "../Search/SearchDrawer";
import TextField from "../ProblemInput/index";

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
      text: "",
      tutorialSteps: [
        {
          content: <div style={{ display: "flex", justifyContent: "center" }}>
            <Guide onTextChange = {this.handleTextChange}/>
          </div>,
        },
        {
          content: <ProblemSolutionPage textField=""/>,
        },
      ],
    };
  }

  handleNext = (hyp, goal) => {

    let newArray = this.state.tutorialSteps.map(l => Object.assign({}, l));

    newArray[1].content = <ProblemSolutionPage textField={`#Propositional Logic #Prove #{${hyp},${goal}}`} />;

    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));

    this.setState({tutorialSteps: newArray}, () => {console.log("UPDATED STATE ", this.state.tutorialSteps[1].content)});
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

  onSubmit = () => {

  }

  render() {
    const { classes, theme } = this.props;
    const { activeStep, tutorialSteps, text } = this.state;

    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <SearchDrawer/>
        <TextField 
          value={text} 
          onChange={this.handleTextChange}
          onSubmit={this.onSubmit}
        />
        <SwipeableViews
          style={{ marginLeft: "30px", marginRight:"30px"}}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
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
