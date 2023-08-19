import { userverifyOTPPostApi } from '@/store/userThunk';
import { createSlice } from '@reduxjs/toolkit';

const userPostverifyOtpSlice = createSlice({
  name: 'dataname',
  initialState: {
    loading: false,
    error: null,
    responseData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userverifyOTPPostApi.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userverifyOTPPostApi.fulfilled, (state:any, action) => {
        console.log("HHHHHHH122",action.payload);
        
        state.loading = false;
        state.responseData = action.payload;
      })
      .addCase(userverifyOTPPostApi.rejected, (state:any, action) => {
        console.log("HHHHHHH1",action);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {actions:apiActions,reducer: apiPostverifyOtpReducer}=userPostverifyOtpSlice
