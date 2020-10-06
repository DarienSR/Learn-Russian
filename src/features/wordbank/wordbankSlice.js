import { createSlice } from '@reduxjs/toolkit';

export const wordbankSlice = createSlice({
  name: "wordbank",
  initialState: {
    set: GenerateSet(0),
    setIndex: 0,
    mode: 0
  },
  reducers: {
    UpdateMode: (state, action) => {
      state.set = []; // clear set
      state.setIndex = 0;
      state.set = GenerateSet(action.payload);
      state.mode = action.payload;
    },

    validate: (state, action) => {
      let verifyAnswer;
      state.mode === 0 ? verifyAnswer = state.set[state.setIndex].russian : verifyAnswer = state.set[state.setIndex].answer;

      if(action.payload === verifyAnswer) {
        if(state.setIndex < state.set.length - 1) {
          state.setIndex++;
        } else {
          state.setIndex = 0;
        }
      }
      
    } 
  },
});

export const { UpdateMode, handleChange, validate } = wordbankSlice.actions;

export const Set = state => state.wordbank.set;
export const SetIndex = state => state.wordbank.setIndex;
export const Mode = state => state.wordbank.mode;


export default wordbankSlice.reducer;

function GenerateSet(mode) {
  let set = [];
  if(mode === 0) {
    set = [
      { russian: "Бабушка дома", english: "Grandmother is at home" },
      { russian: "Как тебя зовут?", english: "What is your name?" }
    ]
  }

  if(mode === 1) {
    set = [
      { russian: "Бабушка", answer: "Grandmother", english: ["Bush", "Grandmother"] },
      { russian: "зовут", answer: "name", english: ["name", "flute"] },
    ]
  }

  if(mode === 2) {
    set = [
      { russian: ["Бабушка", "зовут", "дома"], answer: "Бабушка", english: "Grandmother" },
      { russian: ["Бабушка", "зовут", "дома"], answer: "дома", english: "Home" },
    ]
  }
  return set;
}