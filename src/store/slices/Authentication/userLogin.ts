import { userLoginApiPost} from '@/store/userThunk';
import { createSlice } from '@reduxjs/toolkit';

const userPostLoginSlice = createSlice({
  name: 'userPostLoginSlice/post',
  initialState: {
    loading: false,
    error: null,
    responseData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginApiPost.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLoginApiPost.fulfilled, (state:any, action) => {
        console.log("HHHHHHH122",action.payload);
        
        state.loading = false;
        state.responseData = action.payload;
      })
      .addCase(userLoginApiPost.rejected, (state:any, action) => {
        console.log("HHHHHHH1",action);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {actions:apiActions,reducer: apiLoginPostReducer}=userPostLoginSlice
