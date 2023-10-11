export const getToken=()=>{
    return {token:sessionStorage.getItem("access_token")}
}
export const apiUrl ="http://api.indilink.indicold.in/auth";
// export const apiUrl ="http://www.ikeodesign.com/auth";

// export const apiUrl ="https://seal-app-uqxwl.ondigitalocean.app";
