import { usergetOTPPostApi } from '@/store/userThunk';
import { createSlice } from '@reduxjs/toolkit';

const userPostgetAuthOtpSlice = createSlice({
  name: 'dataname/apidfdfgdgf',
  initialState: {
    loading: false,
    error: null,
    responseDataOTP: null,
    modal:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usergetOTPPostApi.pending, (state:any) => {
        state.loading = true;
        state.error = null;
        
      })
      .addCase(usergetOTPPostApi.fulfilled, (state:any, action) => {
        console.log("HHHHHHH122",action.payload);
        
        state.loading = false;
        state.modal=true
        state.responseDataOTP = action.payload;
      })
      .addCase(usergetOTPPostApi.rejected, (state:any, action) => {
        console.log("HHHHHHH1",action);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {actions:apiActionsdatat,reducer: apiGetAuthOtpDataReducer}=userPostgetAuthOtpSlice
