// settings 
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./Navigation.module.css";
import {
  UpdateMode,
  Mode,
  ToggleTranslation,
} from "../wordbank/wordbankSlice";
import { resetAnswer } from "../keyboard/keyboardSlice";

export function Navbar() {
  const dispatch = useDispatch();

  const mode = useSelector(Mode);
  const mode0 = "Typing"
  const mode1 = "Russian"
  const mode2 = "English"

  const handleToggleTranslation = () => {
    dispatch(ToggleTranslation())
  }

  const handleUpdateMode = (e) => {
    let updateMode = 0; // set default. If not 1 or 2, than 2.

    if(e.target.textContent === mode1) updateMode = 1;
    if(e.target.textContent === mode2) updateMode = 2;

    dispatch(UpdateMode(updateMode))
    dispatch(resetAnswer());
  }
  
  const options = <>
    <button className={styles.button} onClick={ handleUpdateMode }>{ mode0 }</button>
    <button className={styles.button} onClick={ handleUpdateMode }>{ mode1 }</button>
    <button className={styles.button} onClick={ handleUpdateMode }>{ mode2 }</button>
  </>

  const displayTranslationButton = mode === 0 ? <button onClick={ handleToggleTranslation }>Toggle Translation</button> : ""

  return (
    <div className={ styles.navbar }>
      <div className={ styles.company }>
        <h1>LearnRussian</h1>
      </div>

      <span className={styles.translation}>
        { displayTranslationButton }
      </span>

      <div className={ styles.options }>
        { options }
      </div>
    </div>
  )
}