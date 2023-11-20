/* The code is importing two modules: `usergetOTPPostApi` from the `userThunk` file in the `store`
directory, and `createSlice` from the `@reduxjs/toolkit` library. These modules are used to define
and handle asynchronous actions and create a slice of the Redux store respectively. */
import { usergetOTPPostApi } from '@/store/userThunk';
import { createSlice } from '@reduxjs/toolkit';

/* The code is creating a slice of the Redux store using the `createSlice` function from the
`@reduxjs/toolkit` library. */
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
        
        state.loading = false;
        state.modal=true
        state.responseDataOTP = action.payload;
      })
      .addCase(usergetOTPPostApi.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* `export const {actions:apiActionsdatat,reducer: apiGetAuthOtpDataReducer}=userPostgetAuthOtpSlice`
is exporting two variables from the `userPostgetAuthOtpSlice` slice. */
export const {actions:apiActionsdatat,reducer: apiGetAuthOtpDataReducer}=userPostgetAuthOtpSlice
