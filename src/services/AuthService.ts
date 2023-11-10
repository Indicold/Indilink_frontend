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

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: '/sign-in',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData<SignUpResponse>({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
    })
}

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
            messageView(data?.message);
            if(dataa?.redirect!==3){
              setTimeout(() => {
                window.location.href="/VerfyOtp"
              }, 2000);
            }
          
          } else {
            messageView(data?.message);
          }
          
        })
        .catch(error => {
          setSubmitting(false)
        });
      
}
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
            messageView(data?.message)
            window.location.href="/reset-password"
          } else {
            messageView(data?.message);
              setTimeout(() => {
                window.location.href="/VerfyOtp"
              }, 3000);
          }
          
          
        })
        .catch(error => {
          console.log(error);
        });
      
}
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
            messageView(data?.message)
            setTimeout(()=>{
              localStorage.removeItem('RememberMe');
              localStorage.removeItem('user_type');
              localStorage.clear()

              window.location.href="/sign-in"

            },2000)
          } else {
        
            messageView(data?.message);
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
