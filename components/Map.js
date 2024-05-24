// components/Map.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box } from '@mui/material';

const Map = ({ gpsData, stoppages }) => {
  const mapContainerStyle = {
    height: '600px',
    width: '100%'
  };

  const center = { lat: 12.929492, lng: 74.917353 };

  return (
    <Box sx={{ height: '600px', width: '100%', mb: 3 }}>
      <LoadScript googleMapsApiKey="AIzaSyAtRdFbRJZC5zl6KAK1ZihPj2GvrEa-Gi8">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
        >
          {gpsData.map((point, index) => (
            <Marker
              key={index}
              position={{ lat: point.latitude, lng: point.longitude }}
            />
          ))}
          {stoppages.map((stoppage, index) => (
            <Marker
              key={index}
              position={{ lat: stoppage.latitude, lng: stoppage.longitude }}
              icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              onClick={() => alert(`Reach Time: ${new Date(stoppage.reachTime).toLocaleString()}, End Time: ${new Date(stoppage.endTime).toLocaleString()}, Duration: ${stoppage.duration} minutes`)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default Map;
