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


  const handleToggleTranslation = () => {
    dispatch(ToggleTranslation())
  }

  const handleUpdateMode = (e) => {
    if(e.target.textContent === "Typing")
      dispatch(UpdateMode(0))
    if(e.target.textContent === "Russian to English")
      dispatch(UpdateMode(1))
    if(e.target.textContent === "English to Russian")
      dispatch(UpdateMode(2))
  

    dispatch(resetAnswer());
  }
  
  const options = <>
      <button className={styles.button} onClick={ handleUpdateMode }>Typing</button>
      <button className={styles.button} onClick={ handleUpdateMode }>Russian to English</button>
      <button className={styles.button} onClick={ handleUpdateMode }>English to Russian</button>
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