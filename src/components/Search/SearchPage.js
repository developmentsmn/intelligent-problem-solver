import React from "react";
import Connect from "../../libs/algolia/connect";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });
  

class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            input: '',
            data: [
                { topic : "A topic", content: "Some content" }
            ]
        }
        
        
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
                        searchResults.push({ topic: result.hits[i].objectID, content: result.hits[i].Content })
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
        
        return(
            <div>
                <div style={{textAlign: 'center'}}>
                    <TextField
                        value={input}
                        label="Search"
                        style={{ margin: 8, paddingBottom: "3%", width: "50%"}}
                        placeholder="Enter search term here..."
                        //helperText="Full width!"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => this.onChangeInput(e)}
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
                                <TableCell>Topic</TableCell>
                                <TableCell>Content</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.data.map(row => (
                            <TableRow>
                                <TableCell>{row.topic}</TableCell>
                                <TableCell>{row.content}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
            
        )
    }
}

export default Search;