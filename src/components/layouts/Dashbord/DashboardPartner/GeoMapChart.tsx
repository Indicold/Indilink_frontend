// DotDensityMap.js

import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const GeoMapChart = () => {
  useEffect(() => {
    // Sample data structure (replace this with your actual data)
    const portsData = [
      { name: 'India Milion Plaza', location: [28.4647897, 77.0744772], size: 2 },
      // { name: 'Port B', location: [34.0522, -118.2437], size: 5 },
      // { name: 'Port C', location: [30.7128, -74.006], size: 3 },
      // { name: 'Port D', location: [24.0522, -118.2437], size: 5 },
      // { name: 'Port E', location: [25.7128, -74.006], size: 3 },
      // { name: 'Port F', location: [34.0522, -118.2437], size: 5 },
      // { name: 'Port G', location: [410.7128, -74.006], size: 3 },
      // { name: 'Port H', location: [34.0522, -118.2437], size: 5 },
      // Add more data points
    ];

    // Initialize Leaflet map
    const map = L.map('dot-density-map').setView([28.4647897, 77.0744772], 4);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Add dot density to the map
    portsData.forEach((port) => {
      L.circle(port.location, {
        radius: port.size * 1000, // You can adjust the radius based on the data
        color: 'red',
        fillOpacity: 0.8,
      })
        .bindPopup(port.name)
        .addTo(map);
    });

    // Cleanup on component unmount
    return () => map.remove();
  }, []);

  return <div id="dot-density-map" className='w-full sticky rounded-xl' style={{ margin:"auto", marginTop:"60px", height: '400px' }} />;
};

export default GeoMapChart;
