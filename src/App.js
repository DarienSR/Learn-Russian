import React from 'react';
import { Keyboard } from "./features/keyboard/Keyboard";
import { Wordbank } from "./features/wordbank/Wordbank";
import { Navbar } from "./features/navigation/Navbar";
import { useSelector } from 'react-redux';
import './App.css';


import {
  Mode,
} from "./features/wordbank/wordbankSlice";

function App() {
  const mode = useSelector(Mode);

  let app;
  if(mode === 0) {
    app = <>
      <Navbar />
      <Wordbank />
      <Keyboard />
    </>
  } else {
    app = <>
    <Navbar />
    <Wordbank />
  </>
  }

  return (
    <div className="App">
      <header className="App-header">
        { app }
      </header>
    </div>
  );
}

export default App;
