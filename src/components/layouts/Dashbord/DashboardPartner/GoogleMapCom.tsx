import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
interface CustomMarkerProps {
  map: any; // Replace 'any' with the correct type of map
  location: any; // Replace 'any' with the correct type of location
}
const GoogleMapCom = ({locations}:any) => {
  const [map, setMap] = useState<any>(null);
  const mapContainerStyle = {
    width: '100%',
    height: '600px',
  };

  const indiaCenter = {
    lat: 28.5937,
    lng: 84.9629,
  };


const debouncedLocations = useDebounce(locations, 500); // Debounce locations array

useEffect(() => {
  // Your Apollo query logic goes here using debouncedLocations
}, [debouncedLocations]);
const handleMapLoad = (mapInstance: any) => {
  setMap(mapInstance);
};
  return (
    <LoadScript googleMapsApiKey="AIzaSyB7dJWdsmX6mdklhTss1GM9Gy6qdOk6pww">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={indiaCenter}
        zoom={4}
        onLoad={handleMapLoad}
      >
      {map &&
          debouncedLocations?.length > 0 &&
          debouncedLocations?.map((location: any, index: any) => (
            <CustomMarker key={index} map={map} location={location} />
          ))}
        
      </GoogleMap>
    </LoadScript>
  );
};
// Custom hook for debouncing a value
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to cancel the previous timeout
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const CustomMarker: React.FC<CustomMarkerProps> = ({ map, location }) => {
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    const markerInstance = new window.google.maps.Marker({
      position: location,
      map,
      // Other marker options if needed
    });

    setMarker(markerInstance);

    // Clean up the marker when the component unmounts
    return () => {
      markerInstance.setMap(null);
    };
  }, [map, location]);

  return null; // This component doesn't render anything visible
};

export default GoogleMapCom;
