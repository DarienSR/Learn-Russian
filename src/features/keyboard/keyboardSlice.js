import { createSlice } from '@reduxjs/toolkit';

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: { 
    selectedKey: "",
    answer: [],
    keyboardType: 0,
  },
  reducers: {
    highlight: (state, action) => {
      state.selectedKey = action.payload;
      state.answer.push(action.payload)
    },
    addToAnswer: (state) => {
      state.answer.push(state.selectedKey)
    },
    subtractFromAnswer: (state) => {
      // remove the last character from the word
      state.answer.pop();
    },
    toggleKeyboard: (state) => {
      if(state.keyboardType === 2) {
        // loop back
        state.keyboardType = 0; 
        return;
      }
      state.keyboardType++;
    },
    resetAnswer: (state) => {
      state.answer = [];
    }
  }
});

export const { highlight, subtractFromAnswer, toggleKeyboard, resetAnswer } = keyboardSlice.actions;

// being pulled from our store
export const selectKey = state => state.keyboard.selectedKey;
export const answer = state => state.keyboard.answer;
export const keyboardType = state => state.keyboard.keyboardType;

export default keyboardSlice.reducer;