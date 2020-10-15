import { createSlice } from '@reduxjs/toolkit';
import { resetAnswer } from "../keyboard/keyboardSlice";


export const wordbankSlice = createSlice({
  name: "wordbank",
  initialState: {
    set: GenerateSet(0),
    setIndex: 0,
    mode: 0,
    answer: null
  },
  reducers: {
    UpdateMode: (state, action) => {
      state.set = []; // clear set
      state.setIndex = 0;
      state.set = GenerateSet(action.payload);
      state.mode = action.payload;      
      state.answer = state.mode === 0 ? state.set[state.setIndex].russian : state.set[state.setIndex].answer;
    },

    validate: (state, action) => {
      let verifyAnswer;

      state.mode === 0 ? verifyAnswer = state.set[state.setIndex].russian : verifyAnswer = state.set[state.setIndex].answer;
      if(action.payload === verifyAnswer) {
        // Move on to the next question.
        if(state.setIndex < state.set.length - 1) {
          state.setIndex++;
          state.answer = state.mode === 0 ? state.set[state.setIndex].russian : state.set[state.setIndex].answer;
        } else { // finsihed all the questions. Go to the start
          state.setIndex = 0;
          state.answer = state.mode === 0 ? state.set[state.setIndex].russian : state.set[state.setIndex].answer;
        }
        // Notify whether it is correct or wrong. 
      }
    }
  },

});

export const { UpdateMode, handleChange, validate } = wordbankSlice.actions;

export const Set = state => state.wordbank.set;
export const SetIndex = state => state.wordbank.setIndex;
export const Mode = state => state.wordbank.mode;
export const Answer = state => state.wordbank.answer;


export default wordbankSlice.reducer;

// HELPER FUNCTIONS

function GenerateSet(mode) {
  let set = [];
  if(mode === 0) {
    set = GenerateSentencesForTyping();
  }

  if(mode === 1) {
    set = GenerateRussianToEnglish();
  }

  if(mode === 2) {
    set = GenerateEnglishToRussian();
  }
  return set;
}

function GenerateSentencesForTyping() {
  return [
    { russian: "Бабушка дома", english: "Grandmother is at home" },
    { russian: "Как тебя зовут?", english: "What is your name?" }
  ]
}

function GenerateRussianToEnglish() {
  // russian: what you're translating, answer: answer, english: options to pick from
  return [
    { russian: "Бабушка", answer: "Grandmother", english: ["Bush", "Grandmother"] },
  { russian: "зовут", answer: "name", english: ["name", "flute"] },
  ]
}

function GenerateEnglishToRussian() {
  // russian: choices,  answer: what user should input, english: translation
  return [
    { russian: ["Бабушка", "зовут", "дома", "Кот"], answer: "Бабушка", english: "Grandmother" },
    { russian: ["Бабушка", "зовут", "дома"], answer: "дома", english: "Home" },
  ]
}