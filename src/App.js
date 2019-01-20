import React, { Component } from "react";
import "./App.css";
import "katex/dist/katex.min.css";
import ProblemSolutionPage from "./components/ProblemSolutionPage/ProblemSolutionPage";
import HorizontalLinearStepper from "./components/ProblemChooser/HorizontalLinearStepper";

class App extends Component {
  render() {
    return (
      <div className="App">
        
        {/*<ProblemSolutionPage />*/}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HorizontalLinearStepper />
        </div>

      </div>
    );
  }
}

export default App;
