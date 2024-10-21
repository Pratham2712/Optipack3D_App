import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';

const rootReducer = combineReducers({
  authSlice: authSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
