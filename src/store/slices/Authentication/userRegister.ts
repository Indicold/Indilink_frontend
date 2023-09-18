import { userRegisterPostApi } from '@/store/userThunk';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
        console.log("HHHHHHH1",action);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {actions:apiActions,reducer: apiGstDetailsReducer}=userPostOtpSlice
