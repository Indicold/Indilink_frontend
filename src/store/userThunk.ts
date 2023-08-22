import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://seal-app-uqxwl.ondigitalocean.app';



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
    if(data.message.accessToken)sessionStorage.setItem('access_token', data.message.accessToken);
    return data;
  }
);
