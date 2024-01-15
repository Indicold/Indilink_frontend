import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapCom = ({locations}:any) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };



  // Calculate the average center
  const averageCenter = locations?.reduce((acc, location) => {
    return {
      lat: acc.lat + location.lat,
      lng: acc.lng + location.lng,
    };
  }, { lat: 0, lng: 0 });

  averageCenter.lat /= locations.length;
  averageCenter.lng /= locations.length;
console.log("GGGGGGGGGGG",averageCenter,locations);

  return (
    <LoadScript googleMapsApiKey="AIzaSyB7dJWdsmX6mdklhTss1GM9Gy6qdOk6pww">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={averageCenter}
        zoom={10}
      >
        {locations?.length>0 && locations?.map((location:any, index:any) => (
          <Marker key={index} position={location} />
        ))}
        
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapCom;
