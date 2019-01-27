import React, { Component } from "react";
import "./App.css";
import "katex/dist/katex.min.css";
import ProblemSolutionPage from "./components/ProblemSolutionPage/ProblemSolutionPage";
import Guide from "./components/ProblemChooser/Guide";
import Carousel from "./components/ProblemChooser/Carousel";

class App extends Component {
  render() {
    return (
      <div className="App">
        
        {/*<ProblemSolutionPage />*/}

        {/*<Carousel slide1={<Guide />} slide2={<h1>Hello From Slide2</h1>}/>*/}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Guide />
        </div>

      </div>
    );
  }
}

export default App;
