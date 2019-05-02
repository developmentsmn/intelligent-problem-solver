import React from "react";
import Connect from "../../libs/algolia/connect";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import { decodeWolfram } from "../../libs/wolfram/text-replace";

const styles = theme => ({
    root: {
      width: '100%',
      padding: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 50,
      width:"100%"
    },
    searchBox: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
    }
  });
  

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: '',
            data: [
                { topic : "Topic", content: "A set of items that share some common attributes that people care about." }
            ]
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    fillSubmit = (input) => {
        this.setState({input});
        this.onSubmit(input);
    }

    onChangeInput = (event) => {
        const input = event.target.value;
        this.setState(
          {
            input,
          },
        );
      };

    onSubmit = (input) => {
        try
        {
            Connect(input)
                .then((result) => {
                    var searchResults = [];

                    for(var i = 0; i < result.hits.length; i++)
                    {
                        searchResults.push({ topic: result.hits[i].objectID, content: decodeWolfram(result.hits[i].Content).text })
                    }
                        
                    this.setState({
                        data: searchResults
                    })
                });
        }
        catch(error)
        {
            console.log(error);
        }
    }



    render() {

        const { input } = this.state;
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.searchBox}>
                    <TextField
                        value={input}
                        label="Search"
                        style={{ margin: 8, paddingBottom: "3%", width: "50%"}}
                        placeholder="Enter search term(s) here..."
                        //helperText="Full width!"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => this.onChangeInput(e)}
                        onKeyDown={e => {
                            if(e.keyCode === 13 /*13 is the code for enter key*/)
                            {
                                this.onSubmit(input);
                            }
                        }}
                    />
                    <Fab 
                        size="small" 
                        color="primary" 
                        aria-label="Search"
                        onClick={() => {
                            this.onSubmit(input);
                          }}
                    >
                        <SearchIcon />
                    </Fab>
                </div>

                <Paper styles={styles.root}>
                    <Table styles={styles.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Term</TableCell>
                                <TableCell>Definition</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.data.map(row => (
                            <TableRow key={row.topic}>
                                <TableCell>{row.topic}</TableCell>
                                <TableCell>
                                    {row.content.split('\\n').map(function(item, index) {
                                        return(
                                            <span key={index}>
                                                {item}
                                                <br/>
                                            </span>
                                        )
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
            
        )
    }
}

export default withStyles(styles)(Search);