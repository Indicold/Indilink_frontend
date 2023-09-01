export const getToken=()=>{
    return {token:sessionStorage.getItem("access_token")}
}
export const apiUrl ="https://seal-app-uqxwl.ondigitalocean.app";