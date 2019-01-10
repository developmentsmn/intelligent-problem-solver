import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Main.style";

class Main extends PureComponent {
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
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div>
          {children}
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(Main);
