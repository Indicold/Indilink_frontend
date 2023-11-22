// registrationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* The `interface RegistrationState` is defining the shape of the state object for the `registration`
slice. It specifies the types of the properties `loading`, `error`, and `data`. */
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

/* The `initialState` constant is defining the initial state of the `registration` slice. It is an
object of type `RegistrationState` which has three properties: `loading`, `error`, and `data`. */
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

/* The `const registrationSlice = createSlice({ ... })` statement is creating a slice of the Redux
store called "registration". */
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

/* The statement `export const { registerStart, registerSuccess, registerFailure, updateFormData } =
registrationSlice.actions;` is exporting the action creators from the `registrationSlice` slice. */
export const { registerStart, registerSuccess, registerFailure, updateFormData } = registrationSlice.actions;

/* `export default registrationSlice.reducer;` is exporting the reducer function from the
`registrationSlice` slice. This allows the reducer to be imported and used in the Redux store
configuration. */
export default registrationSlice.reducer;
