import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  highlight, 
  selectKey
} from "./keyboardSlice";

import styles from "./Keyboard.module.css";

export function Keyboard() {
  const dispatch = useDispatch();
  const currentKey = useSelector(selectKey);
  const layout = CreateKeyboard();
  
  
  let handleKeyDown = (event) => {
    for(let row = 0; row < layout.length; row++) {
      for(let key = 0; key < layout[row].length; key++) {
        if(event.key.toUpperCase() === layout[row][key].russian || event.key.toUpperCase() === layout[row][key].english) {
          layout[row][key].active = true;
          dispatch(highlight(layout[row][key].russian))
          return;
        }
      }
      
    }
  }

  
  document.addEventListener("keydown", handleKeyDown);

  const keys = layout.map((row) =>
    <div 
    key={row} className={ styles.keyboard }>
      { row.map((key) =>
        { 
          let { english, russian } = key;

          let className;

          if(currentKey === russian) className = `${styles.active}`;
          else className = `${styles.key}`

          return  <p
            key={english}
            className={ className }
          >
            { russian }
            <span className={styles.subscript}>{english}</span>
           
          </p>
        }
      )}
    </div>
  );

  return (
    <div>
      <p className={styles.display}>{ currentKey }</p>

      <div>
        { keys }
      </div>

      <button>Toggle Keyboard</button>
    </div>
  );
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