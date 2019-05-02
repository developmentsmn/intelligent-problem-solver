import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

class Page extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
        <div>
          {children}
        </div>
        </main>
      </div>
    );
  }
}

const styles = theme => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit*3,
      height: "75vh",
      overflow: "auto",
    },
    root: {
        display: "flex",
    },
});

export default withStyles(styles)(Page);
