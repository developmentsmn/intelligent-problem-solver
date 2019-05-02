import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Page from "../../components/Page/Page";
import Carousel from "../../components/ProblemChooser/Carousel";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import SearchDrawer from "../../components/Search/SearchDrawer";

const drawerWidth = "40%";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth})`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    overflowY: "unset"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: "100%",
  },
  contentShift: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: "calc(100% - "+drawerWidth+")",
  },
  mobileStepper: {
    width: "100%",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mobileStepperShift: {
    width: `calc(100% - ${drawerWidth})`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
});

class LogicProof extends Component {
  state = {
    open: false,
  };

  constructor(props){
    super(props);
    console.log(this.searchBar);
  }

  onExplain = (query) => {
    console.log(query);
    this.setState({ open: true });
    this.searchBar.fillSubmit(query)
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <Page>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Intelligent Problem Solver
            </Typography>
          </Toolbar>
        </AppBar>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Carousel classes={{
            mobileStepper: open?classes.mobileStepperShift:classes.mobileStepper
          }}
            onExplain={this.onExplain}
          />
        </main>
        <Drawer
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <SearchDrawer handleDrawerClose={this.handleDrawerClose} onRef={ref => (this.searchBar = ref)}/>
        </Drawer>
      </Page>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LogicProof);
