import React, { Component } from "react";
import "./App.css";
import "katex/dist/katex.min.css";
import ProblemSolutionPage from "./components/ProblemSolutionPage/ProblemSolutionPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProblemSolutionPage />
      </div>
    );
  }
}

export default App;
