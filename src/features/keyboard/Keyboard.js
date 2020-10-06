import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  highlight, 
  selectKey,
  answer, 
  keyboardType,
  subtractFromAnswer,
  toggleKeyboard,
  resetAnswer
} from "./keyboardSlice";

import {
  validate
} from "../wordbank/wordbankSlice"


import styles from "./Keyboard.module.css";

export function Keyboard() {
  const dispatch = useDispatch();
  const currentKey = useSelector(selectKey);
  const KeyboardType = useSelector(keyboardType);
  const displayAnswer = useSelector(answer).join(''); // takes the array, joins it and removes the commas. ['h','i'] -> hi
  const layout = CreateKeyboard();
  
  const handleKeyDown = (event) => {
    window.onkeydown = null; // take away eventhandler on key down while processing key press. Prevents multiple firing
    const eventKey = event.key;
    HandleSpecialKeys(event, dispatch, displayAnswer);
    DetermineLetter(eventKey, layout, dispatch);
  }

  const handleKeyboardToggle = () => {
    dispatch(toggleKeyboard());
  }

  // Prevents multiple firing of keypress
  document.onkeyup = function() {
    handleKeyDown();
  };
  
  // Prevents multiple firing of keypress
  document.onkeyup = function() {
     window.onkeydown = handleKeyDown;
  };

  const keys = layout.map((row) =>
    <div 
      key={row} className={ styles.keyboard }>
      { row.map((key) =>
        { 
          let { english, russian } = key;

          let className;

          if(currentKey.toUpperCase() === russian || currentKey.toUpperCase() === english) className = `${styles.active}`;
          else className = `${styles.key}`
          
          return DetermineKeyboardLayout(english, russian, className, KeyboardType);
        }
      )}
    </div>
  );

  return (
    <div>
      <input className={styles.display} value={ displayAnswer } />
      <p className={styles.note}>Type Slow. Currently, typing fast will not register input.</p>
      <div>
        { keys }
      </div>

      <button onClick={handleKeyboardToggle}>Toggle Keyboard</button>
    </div>
  );
}

// -------------------------
// ---  HELPER FUNCTIONS ---
// -------------------------
function HandleSpecialKeys(event, dispatch, displayAnswer) {
  const BACKSPACE = 8;
  const SPACE = 32;
  const ENTER = 13;
  switch(event.keyCode) {
    case BACKSPACE:
      dispatch(subtractFromAnswer());
      break;
    case SPACE:
      dispatch(highlight(" "));
      break;
    case ENTER:
      dispatch(validate(displayAnswer));
      dispatch(resetAnswer());
      break;
    default:
      break;
  }
}

function DetermineLetter(eventKey, layout, dispatch) {
  for(let row = 0; row < layout.length; row++) {
    for(let key = 0; key < layout[row].length; key++) {
      if(eventKey.toUpperCase() === layout[row][key].russian || eventKey.toUpperCase() === layout[row][key].english) {
        dispatch(highlight(eventKey));
        return;
      }
    }
  }
}

function DetermineKeyboardLayout(english, russian, className, KeyboardType) {
  switch(KeyboardType) {
    case 0: // russian and english
      return <p 
        key={english} className={ className }>
        { russian }
        <span className={styles.subscript}>{english}</span>
      </p>

    case 1: // russian only
      return <p 
        key={english} className={ className }>
        { russian }
      </p>

    case 2: // keyboard off
      return;
    default:
      break;
  }
}  


function CreateKeyboard() {
  let firstRow = [
    { english: "Q", russian: "Й",},
    { english: "W", russian: "Ц",  },
    { english: "E", russian: "У",  },
    { english: "R", russian: "К",  },
    { english: "T", russian: "Е",  },
    { english: "Y", russian: "Н",  },
    { english: "U", russian: "Г",  },
    { english: "I", russian: "Ш",  },
    { english: "O", russian: "Щ",  },
    { english: "P", russian: "З",  },
    { english: "{", russian: "Х",  },
    { english: "}", russian: "Ъ",  },
  ]
  
  let secondRow = [
    { english: "A", russian: "Ф",  },
    { english: "S", russian: "Ы",  },
    { english: "D", russian: "В",  },
    { english: "F", russian: "А",  },
    { english: "G", russian: "П",  },
    { english: "H", russian: "Р",  },
    { english: "J", russian: "О",  },
    { english: "K", russian: "Л",  },
    { english: "L", russian: "Д",  },
    { english: ";", russian: "Ж",  },
    { english: "'", russian: "Э",  },
  ]

  let thirdRow = [
    { english: "Z", russian: "Я",  },
    { english: "X", russian: "Ч",  },
    { english: "C", russian: "С",  },
    { english: "V", russian: "М",  },
    { english: "B", russian: "И",  },
    { english: "N", russian: "Т",  },
    { english: "M", russian: "Ь",  },
    { english: ",", russian: "Б",  },
    { english: ".", russian: "Ю",  },
  ]

  return [
    firstRow, secondRow, thirdRow
  ];

}