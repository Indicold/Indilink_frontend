/* The code is importing three modules: */
import { userRegisterPostApi } from '@/store/userThunk';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/* The code is creating a slice using the `createSlice` function from the `@reduxjs/toolkit` library. A
slice is a collection of reducer functions and actions that can be used to update a specific portion
of the Redux store. */
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
        
        state.loading = false;
        state.responseData = action.payload;
        toast.success('OTP Verified Successfully !', {
          position: 'top-right', // Position of the toast
          autoClose: 3000,       // Auto-close after 3000ms (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
              background: '#FFB017',fontSize:"bold", 
              color:"#fff"// Set the background color here
            },
        });
      })
      .addCase(userRegisterPostApi.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* The line `export const {actions:apiActions,reducer: apiGstDetailsReducer}=userPostOtpSlice` is
exporting two variables `apiActions` and `apiGstDetailsReducer` from the `userPostOtpSlice` object. */
export const {actions:apiActions,reducer: apiGstDetailsReducer}=userPostOtpSlice
