import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'katex/dist/katex.min.css';
import logicProof from './libs/wolfram/solver';
import Page from './components/Page/Page';
import {TeXparser} from './libs/wolfram/parser';
import { InlineMath, BlockMath } from 'react-katex'
import SolutionStepper from './components/SolutionStepper/SolutionStepper';
import ProblemSolutionPage from './components/ProblemSolutionPage/ProblemSolutionPage';

class App extends Component {

  constructor(){
    super();
    this.state = {
      displayStr: "",
    }
  }

  render() {

    const {displayStr} = this.state;
    return (
      <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        <ProblemSolutionPage/>
      </div>
    );
  }
}

export default App;
