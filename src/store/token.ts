export const getToken=()=>{
    return {token:localStorage.getItem("access_token")}
}
const process:any=import.meta.env;
export const apiUrl = process.VITE_API_URL
export const getCordinatesSync = () => {
    let latitude, longitude;
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position?.coords?.latitude;
          longitude = position?.coords?.longitude;
            
    return { latitude, longitude };
        },
        (error) => {
          console.error('Error getting coordinates:', error);
            
    return { latitude:null, longitude:null };
        }
      );
  
  

  };
  

