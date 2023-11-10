import { userverifyOTPPostApi } from '@/store/userThunk';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
        
        state.loading = false;
        state.responseData = action.payload;
        window.location.href="/sign-in"
      })
      .addCase(userverifyOTPPostApi.rejected, (state:any, action) => {
        toast.success('OTP Verified failed !', {
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
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {actions:apiActions,reducer: apiPostverifyOtpReducer}=userPostverifyOtpSlice
