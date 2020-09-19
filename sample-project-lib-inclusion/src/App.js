import React from "react";
import { Button } from 'ph-shared';
import 'antd/dist/antd.min.css';
import 'ph-shared/dist/index.css';
import logo from "./logo.svg";
import "./App.css";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button type="primary">This is button</Button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button>This is button</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
