// settings 
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./Wordbank.module.css";

import {
  Set,
  SetIndex,
  Mode,
  ShowTranslation,
  validate
} from "./wordbankSlice";

export function Wordbank() {
  const dispatch = useDispatch();
  const set = useSelector(Set);
  const setIndex = useSelector(SetIndex);
  const mode = useSelector(Mode);
  const showTranslation = useSelector(ShowTranslation);


  
  const handleValidation = (e) => {
    let list = document.getElementsByClassName('Wordbank_word__1YhBy')
    dispatch(validate({ans: e.target.value, btn: e.target, list}))

    let verifyAnswer;
    mode === 0 ? verifyAnswer = set[setIndex].russian : verifyAnswer = set[setIndex].answer;

    console.log(verifyAnswer === e.target.value)
    
    if(e.target.value === verifyAnswer) {
      for(let btn of list) {
        btn.style.backgroundColor = 'white'
      }
    }
  }


  let display; // if we put on same line, initialization error.
  display = DefineDisplay(mode, display, setIndex, set, handleValidation);
  


  let translationText = showTranslation === true && mode === 0 ? set[setIndex].english : ""

  return (
    <div id={styles.Wordbank}>
      <p className={styles.secondaryText}>
        { translationText }  
      </p> 
      { display } 
    </div>
  )
}

// -----------------
// HELPER FUNCTIONS
// -----------------

function DefineDisplay(mode, display, setIndex, set, handleValidation) {
  switch(mode) {
    case 0:
      return display = <div>
        <p className={styles.mainText}>{ set[setIndex].russian }</p>
      </div>
    case 1: 
      return display = <div>
        <p className={styles.mainText}>{ set[setIndex].russian }</p>
        <div className={styles.list}>
          {
            set[setIndex].english.map((word, count) =>
              <button value={word} onClick={handleValidation} key={count} className={styles.word}> {word} </button>
            )
          }
        </div>
      </div>
    case 2: 
      return display = <div>
        <p className={styles.mainText}>{ set[setIndex].english }</p>
        <div className={styles.list}>
          {
            set[setIndex].russian.map((word, count) =>
            <button value={word} onClick={handleValidation} key={count} className={styles.word}> {word} </button>
          )
          }
        </div>
      </div>
    default:
      break;
  }
}