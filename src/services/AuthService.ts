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
        
console.log("tttt",response);

       

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function apiForgotPassword(dataa:any,messageView:any) {
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
      
      fetch(`${apiUrl}/auth/forgot-pass-gen-otp`, requestOptions)
        .then((response:any )=> {
          console.log("hhhh",JSON.parse(response?._bodyInit));

          if (!response.ok) {
            messageView(JSON.parse(response?._bodyInit)?.message);
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {

          console.log(data);
          if(data?.status){
            messageView("OTP Sent Successfully !");
            
            window.location.href="/VerfyOtp"
          }
          
        })
        .catch(error => {
          console.log("HHHH",error);
          
          console.log(error);
        });
      
}
export async function apiVerifyOTP(dataa:any,messageView:any) {
    console.log(dataa,"dataa");
    
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
          if (!response.ok) {
            messageView(JSON.parse(response?._bodyInit)?.message);
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {

          console.log(data);
          if(data?.status){
            messageView("OTP Verified Successfully !")
            window.location.href="/reset-password"
          }
          
        })
        .catch(error => {
          console.log(error);
        });
      
}
export async function apiResetPassword(dataa:any,messageView:any) {
    console.log(dataa,"dataa");
    
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
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {

          console.log(data);
          if(data?.status){
            messageView(data?.message)
            setTimeout(()=>{
              window.location.href="/sign-in"

            },2000)
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
