import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice.js';
import mainSlice from './Slices/mainSlice.js';

const rootReducer = combineReducers({
  authSlice: authSlice,
  mainSlice: mainSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
