import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'katex/dist/katex.min.css';
import logicProof from './libs/wolfram/solver';
import Page from './components/Page/Page';
import {TeXparser} from './libs/wolfram/parser';
import { InlineMath, BlockMath } from 'react-katex'
import ProblemInput from './components/ProblemInput/index'

class App extends Component {

  constructor(){
    super();
    this.state = {
      displayStr: "",
    }
  }

  componentDidMount(){
    this.solve("{{P \\[And] Q, P \\[Implies] (R \\[And] Q), R\\[Implies](S\\[And]T)},{T}}");
  }

  solve = (problem) =>{
    logicProof(problem)
    .then((arr) => {
      return TeXparser(arr[0][0][0]);
    })
    .then((res) => {
      console.log(res);
      return this.setState({displayStr:res});
    })
    .catch((err) => {
      console.log(err);
    })
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
        <Page>
          <h1>What's your problem?</h1>
          <ProblemInput/>
        </Page>
      </div>
    );
  }
}

export default App;
