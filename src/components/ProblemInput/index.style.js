export default theme => ({
  root:{
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    flexGrow: 1
  },
  TextField:{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.spacing.unit
  },
  Keyboard:{
    width: "100%",
  }
});
