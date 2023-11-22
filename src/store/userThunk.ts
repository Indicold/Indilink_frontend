/* 
* The code is creating a set of async thunks for making API requests. 
*/
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from './customeHook/token';

const API_URL = apiUrl;



/* The code is creating an async thunk function called `userRegisterPostApi`. An async thunk is a
special type of function that can be used with Redux Toolkit to handle asynchronous actions. */
export const userRegisterPostApi = createAsyncThunk(
  'api/postData',
  async (formData) => {
    const response = await fetch(`${API_URL}/auth/getGstDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  }
);

/* The code is creating an async thunk function called `usergetOTPPostApi`. An async thunk is a special
type of function that can be used with Redux Toolkit to handle asynchronous actions. */
export const usergetOTPPostApi = createAsyncThunk(
  'api/postData',
  async (formData) => {
    const response = await fetch(`${API_URL}/auth/getOTP`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  }
);

/* The code is creating an async thunk function called `userverifyOTPPostApi`. This function is used to
make an API request to verify an OTP (One-Time Password). */
export const userverifyOTPPostApi = createAsyncThunk(
  'api/postData',
  async (formData) => {
    const response = await fetch(`${API_URL}/auth/verifyOTP`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  }
);

/* The code is creating an async thunk function called `userLoginApiPost`. This function is used to
make an API request to login a user. */
export const userLoginApiPost = createAsyncThunk(
  'api/postData',
  async (formData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if(data.message.accessToken)localStorage.setItem('access_token', data.message.accessToken);
    return data;
  }
);

