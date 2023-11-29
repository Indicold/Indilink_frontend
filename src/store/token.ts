export const getToken=()=>{
    return {token:localStorage.getItem("access_token")}
}
const process:any=import.meta.env;
export const apiUrl = process.VITE_API_URL

