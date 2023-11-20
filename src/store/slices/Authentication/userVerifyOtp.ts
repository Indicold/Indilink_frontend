/* These lines of code are importing certain modules and functions from external libraries and files. */
import { userverifyOTPPostApi } from '@/store/userThunk';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/* The code is creating a slice using the `createSlice` function from the `@reduxjs/toolkit` library. A
slice is a portion of the Redux store that contains the state and reducers for a specific feature or
domain of your application. */
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

/* The line `export const {actions:apiActions,reducer: apiPostverifyOtpReducer}=userPostverifyOtpSlice`
is exporting two variables `apiActions` and `apiPostverifyOtpReducer` from the
`userPostverifyOtpSlice` slice. */
export const {actions:apiActions,reducer: apiPostverifyOtpReducer}=userPostverifyOtpSlice
