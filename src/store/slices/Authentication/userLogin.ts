import { userLoginApiPost} from '@/store/userThunk';
import { createSlice } from '@reduxjs/toolkit';

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
        console.log("HHHHHHH122",action.payload);
        
        state.loading = false;
        state.responseData = action.payload;
        if(action.payload.accessToken){
          localStorage.setItem("Access_Token",action.payload.accessToken)

        }
        
      })
      .addCase(userLoginApiPost.rejected, (state:any, action) => {
        console.log("HHHHHHH1",action);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {actions:apiActions,reducer: apiLoginPostReducer}=userPostLoginSlice
