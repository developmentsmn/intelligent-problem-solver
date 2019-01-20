import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ButtonBases from './ButtonBases';
import PropLogicInput from './PropLogicInput';
import ProblemSolutionPage from '../ProblemSolutionPage/ProblemSolutionPage';

const pstyles = {
  Paper: {padding: 20, marginTop: 10, marginBottom: 10, height: 500, width: '50%', marginLeft: 'auto', marginRight: 'auto' }
}

const styles = theme => ({
  root: {
    width: '90%',
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
  return ['Choose Problem Topic', 'Choose Problem Solution Type', 'Enter your problem!'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Choose Problem Topic...';
    case 1:
      return 'Choose Problem Solution Type';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

class HorizontalLinearStepper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      skipped: new Set(),
      content: 
      <Grid container sm>
        <Paper style={pstyles.Paper}>
          <ButtonBases handler={this.handler}/>
        </Paper>
      </Grid>,
      prevContent: []
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
    //let temp = this.state.prevContent[0];
    //temp.splice(0, 1);

    //console.log(this.state.prevContent.length);

    if(this.state.prevContent.length === 1)
    {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
        content: <Grid container sm>
        <Paper style={pstyles.Paper}>
          <ButtonBases handler={this.handler}/>
        </Paper>
      </Grid>,
        prevContent: []
      }));
    }
    else
    {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
        content: this.state.prevContent[0],
        prevContent: this.state.prevContent.splice(0, 1)
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

    this.setState(state => {
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

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }
  
  handlerType = (value) => {
    //0 means simplification
    //1 means proof
    let temp = this.state.prevContent;
    temp.splice(0, 0, this.state.content);
    //simplification
    if(value === 1)
    {
      this.setState({
        activeStep: this.state.activeStep+1,
        prevContent: temp,
        content: <h1>SIMPLIFICATION</h1>
      })
    }
    //proof
    else if(value === 0)
    {
      this.setState({
        activeStep: this.state.activeStep+1,
        prevContent: temp,
        content: 
        <div>
          <Button color="secondary" variant="contained" onClick={this.handleBack}>Back</Button>
          <ProblemSolutionPage />
        </div>
      })
    }
    

  };

  handler = (value) => {

    let temp = this.state.prevContent;
    temp.splice(0, 0, this.state.content);

    if(value === 0)
    {
      this.setState({
        activeStep: this.state.activeStep + 1,
        prevContent: temp,
        content: 
        <Paper style={pstyles.Paper}>
          <PropLogicInput pstyles={pstyles} handlerType={this.handlerType}/>
        </Paper>
      });
    }
    else if(value === 1)
    {
      this.setState({
        activeStep: this.state.activeStep + 1,
        prevContent: temp,
        content: <h1>BINARY RELATON CHOSEN</h1>
      });
    }  
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    //let content;

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

    return (
      <div className={classes.root}>
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

                {this.state.content}

                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                  color="secondary"
                >
                  Back
                </Button>
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
                {/*
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>*/}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLinearStepper);
