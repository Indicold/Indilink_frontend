export const getToken=()=>{
    return {token:sessionStorage.getItem("access_token")}
}
export const apiUrl ="http://www.ikeodesign.com/auth";
