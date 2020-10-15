// settings 
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./Wordbank.module.css";

import {
  UpdateMode,
  Set,
  SetIndex,
  Mode
} from "./wordbankSlice";

import { resetAnswer } from "../keyboard/keyboardSlice";

export function Wordbank() {
  const dispatch = useDispatch();
  const set = useSelector(Set);
  const setIndex = useSelector(SetIndex);
  const mode = useSelector(Mode);

  const handleUpdateMode = (e) => {
    if(e.target.textContent === "Typing")
      dispatch(UpdateMode(0))
    if(e.target.textContent === "Russian to English")
      dispatch(UpdateMode(1))
    if(e.target.textContent === "English to Russian")
      dispatch(UpdateMode(2))

    dispatch(resetAnswer());
  }

  let display;
  display = DefineDisplay(mode, display, setIndex, set, handleUpdateMode);
  
  return (
    <div id={styles.Wordbank}>
      { display }
    </div>
  )
}

// -----------------
// HELPER FUNCTIONS
// -----------------

function DefineDisplay(mode, display, setIndex, set, handleUpdateMode) {
  const options = <div>
    <button className={styles.button} onClick={ handleUpdateMode }>Typing</button>
    <button className={styles.button} onClick={ handleUpdateMode }>Russian to English</button>
    <button className={styles.button} onClick={ handleUpdateMode }>English to Russian</button>
  </div>

  switch(mode) {
    case 0:
      return display = <div>
        { options }
        <h3>Practice Typing the following Russian sentences</h3>
        <p className={styles.secondaryText}>{ set[setIndex].english }</p>
        <p className={styles.mainText}>{ set[setIndex].russian }</p>
      </div>
    case 1: 
      return display = <div>
        { options }
        <h3>Translate from Russian to English</h3>
        <p className={styles.mainText}>{ set[setIndex].russian }</p>
        <div className={styles.list}>
          {
            set[setIndex].english.map((word, count) =>
              <p key={count} className={styles.word}> {word} </p>
            )
          }
        </div>
      </div>
    case 2: 
      return display = <div>
        { options }
        <h3>Translate from English to Russian</h3>
        <p className={styles.mainText}>{ set[setIndex].english }</p>
        <div className={styles.list}>
          {
            set[setIndex].russian.map((word, count) =>
            <p key={count} className={styles.word}>  { word } </p>
            )
          }
        </div>
      </div>
    default:
      break;
  }
}