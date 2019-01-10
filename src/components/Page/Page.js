import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Main from "../Main/Main";
import styles from "./Page.style";

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
        <Main>{children}</Main>
      </div>
    );
  }
}

export default withStyles(styles)(Page);
