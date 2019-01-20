import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 300,
    width: '100%'},

  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.25,
      },
      '& $imageMarked': {
        opacity: 1,
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
  },

  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
    
  },
});

const images = [
  {
    url: 'proof.jpg',
    title: '',
    width: '95%',
  },
  {
    url: 'simp.jpg',
    title: '',
    width: '95%',
  },
];

function ButtonBases(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {images.map( (image,index) => (
        <ButtonBase variant = "contained"
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
            marginTop: '10px', 
            boxShadow: '3px 3px 2px grey',
          }}
          onClick={() => props.handlerType(index)}>
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonBases);






/*

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class PropLogicInput extends React.Component {


    render () {
        return (
            <Paper style={this.props.pstyles.Paper}>
                <Button 
                    style={
                            {
                                width: '50%', 
                                height:'50%'
                            }
                        } 
                    variant="contained" 
                    onClick={() => this.props.handlerType(0)}>
                        Simplification
                </Button>
                <Button variant="contained" onClick={() => this.props.handlerType(1)}>Proof</Button>
            </Paper>
        )
    }
}

export default PropLogicInput;

*/

