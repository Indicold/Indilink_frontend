/* The code is importing two modules: `userLoginApiPost` from the `userThunk` file in the `store`
directory, and `createSlice` from the `@reduxjs/toolkit` library. */
import { userLoginApiPost} from '@/store/userThunk';
import { createSlice } from '@reduxjs/toolkit';

/* The code is creating a slice of the Redux store for handling user login API requests. */
const userPostLoginSlice = createSlice({
  name: 'userPostLoginSlice/post',
  initialState: {
    loading: false,
    error: null,
    responseData: null,
    refreshPage:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginApiPost.pending, (state:any) => {
        state.error = null;
        state.refreshPage=false
      })
      .addCase(userLoginApiPost.fulfilled, (state:any, action) => {
        
        state.loading = false;
        state.responseData = action.payload;
        if(action.payload.accessToken){
          localStorage.setItem("Access_Token",action.payload.accessToken)

        }
        
      })
      .addCase(userLoginApiPost.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* `export const {actions:apiActions,reducer: apiLoginPostReducer}=userPostLoginSlice` is exporting two
variables from the `userPostLoginSlice` object. */
export const {actions:apiActions,reducer: apiLoginPostReducer}=userPostLoginSlice
