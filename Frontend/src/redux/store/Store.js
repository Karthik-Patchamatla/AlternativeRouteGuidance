import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from '../slices/AuthSlice';
import FromToReducer from '../slices/FromToSlice';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    fromto: FromToReducer
  },
});

export default store;