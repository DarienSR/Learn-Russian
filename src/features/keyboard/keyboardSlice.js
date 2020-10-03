import { createSlice } from '@reduxjs/toolkit';

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: {
    selectedKey: "Start Typing"
  },
  reducers: {
    highlight: (state, action) => {
      state.selectedKey = action.payload;
    }
  }
});

export const { highlight } = keyboardSlice.actions;

// being pulled from our store
export const selectKey = state => state.keyboard.selectedKey;

export default keyboardSlice.reducer;