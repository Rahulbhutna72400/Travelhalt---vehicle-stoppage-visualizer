// components/Map.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Box } from '@mui/material';

const Map = ({ gpsData, stoppages }) => {
  const mapContainerStyle = {
    height: '600px',
    width: '100%',
  };

  const center = gpsData.length > 0 ? { lat: gpsData[0].latitude, lng: gpsData[0].longitude } : { lat: 0, lng: 0 };

  const [selectedStoppage, setSelectedStoppage] = useState(null);

  const handleMarkerClick = (stoppage) => {
    console.log('Marker clicked:', stoppage);
    setSelectedStoppage(stoppage);
  };

  const handleCloseClick = () => {
    console.log('InfoWindow closed');
    setSelectedStoppage(null);
  };

  return (
    <Box sx={{ height: '600px', width: '100%', mb: 3 }}>
      <LoadScript googleMapsApiKey="AIzaSyAtRdFbRJZC5zl6KAK1ZihPj2GvrEa-Gi8">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
          {gpsData.map((point, index) => (
            <Marker key={index} position={{ lat: point.latitude, lng: point.longitude }} />
          ))}
          {stoppages.map((stoppage, index) => (
            <Marker
              key={index}
              position={{ lat: stoppage.latitude, lng: stoppage.longitude }}
              icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              onClick={() => handleMarkerClick(stoppage)}
            />
          ))}
          {selectedStoppage && (
            <InfoWindow
              position={{ lat: selectedStoppage.latitude, lng: selectedStoppage.longitude }}
              onCloseClick={handleCloseClick}
            >
              <div>
                <h2>Stoppage Information</h2>
                <p><strong>Reach Time:</strong> {new Date(selectedStoppage.reachTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(selectedStoppage.endTime).toLocaleString()}</p>
                <p><strong>Duration:</strong> {selectedStoppage.duration} minutes</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default Map;
