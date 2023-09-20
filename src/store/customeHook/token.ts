/**
 * The function `getToken` returns an object containing the access token stored in the session storage.
 * @returns The `getToken` function is returning an object with a `token` property. The value of the
 * `token` property is retrieved from the `access_token` stored in the `sessionStorage`. The `apiUrl`
 * variable is returning a string with the value "https://seal-app-uqxwl.ondigitalocean.app".
 */
export const getToken=()=>{
    return {token:sessionStorage.getItem("access_token")}
}
export const apiUrl ="https://seal-app-uqxwl.ondigitalocean.app";