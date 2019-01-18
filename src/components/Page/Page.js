import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Main from "../Main/Main";
import styles from "./Page.style";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  static propTypes = {
    classes: PropTypes.shape().isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  

  render() {

    function ListItemLink(props) {
      return <ListItem button component="a" {...props} />;
    }
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <Main>{children}</Main>
        <div>
          <input type="text" className="input" placeholder="Search..." />
            <ul>
              ...
            </ul>
        </div>
        <List component="nav" style={{height:'50%', width:'100vw'}}>
            <ListItem button style={{width:'50vw'}} onClick={() => { console.log('Core Language Clicked');}}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Core Language & Structure" />
            </ListItem>
            <ListItem button style={{width:'50vw'}}>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Visualization & Graphics" />
            </ListItem>
        </List>
        <Divider />
        <List component="nav" style={{marginRight: '50%', height:'50%', width:'100vw'}}>
          <ListItem button style={{width:'50vw'}}>
            <ListItemText primary="Data Manipulation & Analysis" />
          </ListItem>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Machine Learningx" />
          </ListItemLink>
      </List>
      </div>
    );
  }
}

export default withStyles(styles)(Page);
