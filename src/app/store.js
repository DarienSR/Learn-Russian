import { configureStore } from '@reduxjs/toolkit';
import keyboardReducer from '../features/keyboard/keyboardSlice';

export default configureStore({
  reducer: {
    keyboard: keyboardReducer
  },
});
