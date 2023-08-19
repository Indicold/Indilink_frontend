// registrationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegistrationState {
  loading: boolean;
  error: string | null;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    confirm_password: string;
    gst: string;
    term_condition: string;
  };
}

const initialState: RegistrationState = {
  loading: false,
  error: null,
  data: {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    gst: '',
    term_condition: '',
  },
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateFormData: (state, action: PayloadAction<RegistrationState['data']>) => {
      state.data = action.payload;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure, updateFormData } = registrationSlice.actions;

export default registrationSlice.reducer;
