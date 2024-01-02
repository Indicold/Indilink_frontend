/* The code is importing various modules and types from different files and libraries. */
import { apiUrl } from '@/store/customeHook/token'
import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
} from '@/@types/auth'
import { setThemeColor } from '@/store'
import { messageViewNew } from '@/store/customeHook/validate'

/**
 * The function `apiSignIn` is an asynchronous function that sends a POST request to the '/sign-in'
 * endpoint with the provided `data` and returns a promise that resolves to a `SignInResponse`.
 * @param {SignInCredential} data - The `data` parameter is an object of type `SignInCredential` which
 * contains the necessary information for signing in. This could include fields such as username and
 * password.
 * @returns The `apiSignIn` function is returning a promise that resolves to the result of calling the
 * `fetchData` function from the `ApiService` module.
 */
export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: '/sign-in',
        method: 'post',
        data,
    })
}

/**
 * The `apiSignUp` function is an asynchronous function that sends a POST request to the '/sign-up'
 * endpoint with the provided data and returns a promise that resolves to a `SignUpResponse`.
 * @param {SignUpCredential} data - The `data` parameter is an object that contains the sign-up
 * credentials for a user. It typically includes properties such as `username`, `email`, and
 * `password`.
 * @returns The `apiSignUp` function is returning a promise that resolves to the result of calling the
 * `ApiService.fetchData` function.
 */
export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData<SignUpResponse>({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

/**
 * The function `apiSignOut` sends a POST request to the '/sign-out' endpoint to sign out the user.
 * @returns The `apiSignOut` function is returning a promise.
 */
export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
    })
}

/**
 * The above function is an asynchronous function that fetches data from a specified URL using the
 * provided configuration and returns the response data.
 * @param {any} config - The `config` parameter is an object that contains the configuration options
 * for the fetch request. It has the following properties:
 * @returns the data fetched from the specified URL.
 */
export async function fetchData(config:any) {
    try {
        const response = await fetch(config.url, {
            method: config.method,
            headers: config.headers,
            body: JSON.stringify(config.data),
        }).then((res)=>res.json())
        

       

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * The function `apiForgotPassword` is an asynchronous function that sends a POST request to the
 * `/auth/forgot-pass-gen-otp` endpoint with the provided email, and handles the response accordingly.
 * @param {any} dataa - An object containing the email property.
 * @param {any} messageView - The `messageView` parameter is a function that is used to display a
 * message to the user. It takes a string as an argument and can be used to show success or error
 * messages.
 * @param {any} setSubmitting - A function that sets the submitting state of the form. It is used to
 * indicate whether the form is currently being submitted or not.
 */
export async function apiForgotPassword(dataa:any,messageView:any,setSubmitting:any) {
   
  const data = JSON.stringify({
        email: dataa?.email
      });
      
      const headers = {
        'Content-Type': 'application/json'
      };
      
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
      };
      setSubmitting(true)
      fetch(`${apiUrl}/auth/forgot-pass-gen-otp`, requestOptions)
        .then((response:any )=> {

          return response.json();
        })
        .then(data => {
          setSubmitting(false)
          
          if(data?.status == true){
            messageViewNew(data);
            if(dataa?.redirect!==3){
              setTimeout(() => {
                window.location.href="/VerfyOtp"
              }, 2000);
            }
          
          } else {
            messageViewNew(data);
          }
          
        })
        .catch(error => {
          setSubmitting(false)
        });
      
}

/**
 * The function `apiVerifyOTP` sends a POST request to a specified API endpoint with email and OTP
 * data, and based on the response, displays a message and redirects the user to a different page.
 * @param {any} dataa - The `dataa` parameter is an object that contains the following properties:
 * @param {any} messageView - The `messageView` parameter is a function that is used to display a
 * message to the user. It takes a string as an argument and can be used to show success or error
 * messages based on the API response.
 */
export async function apiVerifyOTP(dataa:any,messageView:any) {
    
    const data = JSON.stringify({
        email: dataa?.email,
        otp:dataa?.OTP
      });
      
      const headers = {
        'Content-Type': 'application/json'
      };
      
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
      };
      
      fetch(`${apiUrl}/auth/forgot-pass-verify-otp`, requestOptions)
        .then((response:any )=> {

          return response.json();
        })
        .then(data => {

          if(data?.status == true){
            messageViewNew(data)
            window.location.href="/reset-password"
          } else {
            messageViewNew(data);
              setTimeout(() => {
                window.location.href="/VerfyOtp"
              }, 3000);
          }
          
          
        })
        .catch(error => {
          console.log(error);
        });
      
}

/**
 * The `apiResetPassword` function sends a PUT request to the server to reset a user's password and
 * handles the response accordingly.
 * @param {any} dataa - The `dataa` parameter is an object that contains the following properties:
 * @param {any} messageView - The `messageView` parameter is a function that is used to display a
 * message to the user. It takes a string as an argument and can be used to show success or error
 * messages after the API call is made.
 */
export async function apiResetPassword(dataa:any,messageView:any) {
    
    const data = JSON.stringify({
        email: dataa?.email,
        password:dataa?.password,
        confirm_password:dataa?.confirm_password
      });
      
      const headers = {
        'Content-Type': 'application/json'
      };
      
      const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
      };
      
      fetch(`${apiUrl}/auth/forgot-pass-set-new-pass`, requestOptions)
        .then(response => {

          return response.json();
        })
        .then(data => {

          if(data?.status == 200){
            messageViewNew(data)
            setTimeout(()=>{
              localStorage.removeItem('RememberMe');
              localStorage.removeItem('user_type');
              localStorage.clear()

              window.location.href="/sign-in"

            },2000)
          } else {
        
            messageViewNew(data);
          }
     
          
        })
        .catch(error => {
          console.log(error);
        });
      
}
// export async function apiResetPassword(data: ResetPassword) {
//     return ApiService.fetchData({
//         url: '/reset-password',
//         method: 'post',
//         data,
//     })
// }
