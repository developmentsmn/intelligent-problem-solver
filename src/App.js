import React, { Component } from "react";
import "./App.css";
import "katex/dist/katex.min.css";
import Main from "./pages/Main";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Navbar /> */}
        {/* <Sidebar /> */}
        <Main />
      </div>
    );
  }
}

export default App;
