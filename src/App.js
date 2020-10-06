import React from 'react';
import { Keyboard } from "./features/keyboard/Keyboard";
import { Wordbank } from "./features/wordbank/Wordbank";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wordbank />
        <Keyboard />
      </header>
    </div>
  );
}

export default App;
