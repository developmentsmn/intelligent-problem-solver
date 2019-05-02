import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement)
}

class PropertiesChecker extends React.Component {
    
    static propTypes = {
        classes: PropTypes.shape().isRequired,
        dataString: PropTypes.string.isRequired,
      }
    
    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.parse(props.dataString));
        console.log(this.state);
    }

    /* 
    {
        "Result":true,
        "NotValidAt":[],
        "Set":["a","b","c","d","e"],
        "Relation":[["a","a"],["b","b"],["c","c"],["d","d"],["e","e"],["a","b"],["b","a"],["c","d"],["d","a"],["c","b"],["d","b"],["d","e"]],
        "Property":"Reflexive"
    }
    */
    render() {
        const { classes } = this.props;
        let { Result, NotValidAt, Set, Relation, Property } = this.state;
        let S = JSON.stringify(Set).replaceAll("[", "{");
        S = S.replaceAll("]", "}");
        Relation = JSON.stringify(Relation).replaceAll("[", "{");
        Relation = Relation.replaceAll("]", "}");
        if (Property === "Transitive"){
            let NotValidComp = NotValidAt.map(item => (
                <p>
                    • contain {JSON.stringify(item.has).replaceAll("[","{").replaceAll("]","}")+" "}
                    but missing {JSON.stringify(item.missing).replaceAll("[","{").replaceAll("]","}")}
                </p>
            ));
            NotValidAt = NotValidComp;
        }
        else{
            NotValidAt = "contain " + JSON.stringify(NotValidAt).replaceAll("[", "{");
            NotValidAt = NotValidAt.replaceAll("]", "}");
        }
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Problem
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Check {this.state["Property"]}
                    </Typography>
                    <br/>
                    <Typography className={classes.pos} color="textSecondary">
                        Set
                    </Typography>
                    <Typography className={classes.code} component="p">
                        {S}
                    </Typography>
                    <br/>
                    <Typography className={classes.pos} color="textSecondary">
                        Relation
                    </Typography>
                    <Typography className={classes.code} component="p">
                        {Relation}
                    </Typography>
                    <br/>
                    <Typography className={classes.pos} color="textSecondary">
                        Result
                    </Typography>
                    <Typography className={classes.code} component="p">
                        The relation is {Result?"":"NOT"} {Property}
                    </Typography>
                    <br/>
                    {!Result &&
                    <div>
                    <Typography className={classes.pos} color="textSecondary">
                        <Typography variant="h5" component="h3" gutterBottom>
                            What is missing?
                        </Typography>
                        A <code>{Property}</code> closure of the set must
                    </Typography>
                    <Typography className={classes.code} component="p">
                        {NotValidAt}
                    </Typography>
                    </div>}
                </Card>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        maxWidth: 500,
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
    },
    card: {
        minWidth: 275,
        padding: theme.spacing.unit * 3
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    code: {
        fontFamily: '"Lucida Console", Monaco, monospace'
    }
});

export default withStyles(styles)(PropertiesChecker);