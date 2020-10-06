import { configureStore } from '@reduxjs/toolkit';
import keyboardReducer from '../features/keyboard/keyboardSlice';
import wordbankReducer from '../features/wordbank/wordbankSlice';

export default configureStore({
  reducer: {
    keyboard: keyboardReducer,
    wordbank: wordbankReducer,
  },
});
