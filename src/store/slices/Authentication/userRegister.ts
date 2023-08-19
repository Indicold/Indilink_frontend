import { userRegisterPostApi } from '@/store/userThunk';
import { createSlice } from '@reduxjs/toolkit';

const userPostOtpSlice = createSlice({
  name: 'dataname',
  initialState: {
    loading: false,
    error: null,
    responseData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegisterPostApi.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegisterPostApi.fulfilled, (state:any, action) => {
        console.log("HHHHHHH122",action.payload);
        
        state.loading = false;
        state.responseData = action.payload;
      })
      .addCase(userRegisterPostApi.rejected, (state:any, action) => {
        console.log("HHHHHHH1",action);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {actions:apiActions,reducer: apiGstDetailsReducer}=userPostOtpSlice
