import { configureStore } from '@reduxjs/toolkit';
import keyboardReducer from '../features/keyboard/keyboardSlice';
import wordbankReducer from '../features/wordbank/wordbankSlice';
import navigationReducer from '../features/navigation/navigationSlice';
export default configureStore({
  reducer: {
    keyboard: keyboardReducer,
    wordbank: wordbankReducer,
    navigation: navigationReducer,
  },
});
