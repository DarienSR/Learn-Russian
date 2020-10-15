import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  highlight, 
  selectKey,
  userAnswer, 
  keyboardType,
  toggleKeyboard,
  resetAnswer
} from "./keyboardSlice";

import {
  validate,
  Answer
} from "../wordbank/wordbankSlice"


import styles from "./Keyboard.module.css";

export function Keyboard() {
  const dispatch = useDispatch();
  const currentKey = useSelector(selectKey);
  const KeyboardType = useSelector(keyboardType);
  const answer = useSelector(Answer);
  const layout = CreateKeyboard();
  let userInput = useSelector(userAnswer);

  function useInput({ type /*...*/ }) {
    let [value, setValue] = useState("");
    // update answer and highlight most recently pressed key
    const input = <input id={styles.input} value={userInput} onChange={e => dispatch(highlight(e.target.value))} type={type} />;


    // check to see if input is correct.
    if(userInput === answer) {
      dispatch(validate(userInput));
      // reset input to blank
      dispatch(resetAnswer());
    }
    return [value, input];
  }  

  const handleKeyboardToggle = () => {
    dispatch(toggleKeyboard());
  }



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


  const [, ansInput] = useInput({ type: "text" });

  return (
    <div>
      <div>
        {ansInput}
      </div>

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