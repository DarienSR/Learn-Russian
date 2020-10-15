import { createSlice } from '@reduxjs/toolkit';

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: { 
    selectedKey: "",
    userAnswer: "",
    keyboardType: 0,
  },
  reducers: {
    highlight: (state, action) => {
      // get the last key pressed for highlighting on the keyboard
      state.selectedKey = action.payload.slice(-1);
      state.userAnswer = action.payload;
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
      state.userAnswer = "";
    }
  }
});

export const { highlight, toggleKeyboard, resetAnswer} = keyboardSlice.actions;

// being pulled from our store
export const selectKey = state => state.keyboard.selectedKey;
export const userAnswer = state => state.keyboard.userAnswer;
export const keyboardType = state => state.keyboard.keyboardType;

export default keyboardSlice.reducer;