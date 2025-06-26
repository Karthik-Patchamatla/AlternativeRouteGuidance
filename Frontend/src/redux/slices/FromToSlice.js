import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  from: '',
    to: '',
};

const fromToSlice = createSlice({
  name: 'fromto',
  initialState,
  reducers: {
    setTrainDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearTrainDetails: () => initialState,
  },
});

export const { setTrainDetails, clearTrainDetails } = fromToSlice.actions;
export default fromToSlice.reducer;
