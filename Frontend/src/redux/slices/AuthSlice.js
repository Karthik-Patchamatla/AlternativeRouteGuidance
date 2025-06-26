import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  mobileNumber: '',
  password: '',
  address: '',
  birthday: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUserDetails: () => initialState,
  },
});

export const { setUserDetails, clearUserDetails } = authSlice.actions;
export default authSlice.reducer;
