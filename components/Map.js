// components/Map.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Polyline } from '@react-google-maps/api';
import { Box } from '@mui/material';

const Map = ({ gpsData, stoppages }) => {
  const mapContainerStyle = {
    height: '600px',
    width: '100%',
  };

  const center = gpsData.length > 0 ? { lat: gpsData[0].latitude, lng: gpsData[0].longitude } : { lat: 0, lng: 0 };

  const [selectedStoppage, setSelectedStoppage] = useState(null);

  useEffect(() => {
    console.log('Map Component Stoppages:', stoppages);
  }, [stoppages]);

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
          <Polyline
            path={gpsData.map(point => ({ lat: point.latitude, lng: point.longitude }))}
            options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }}
          />
          
          {/* Starting Point Marker */}
          {gpsData.length > 0 && (
            <Marker
              position={{ lat: gpsData[0].latitude, lng: gpsData[0].longitude }}
              icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
              title="Starting Point"
            />
          )}
          
          {/* Ending Point Marker */}
          {gpsData.length > 0 && (
            <Marker
              position={{ lat: gpsData[gpsData.length - 1].latitude, lng: gpsData[gpsData.length - 1].longitude }}
              icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              title="Ending Point"
            />
          )}
          
          {/* Stoppages Markers */}
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
                <p><strong>End Time:</strong> {selectedStoppage.endTime ? new Date(selectedStoppage.endTime).toLocaleString() : 'Ongoing'}</p>
                <p><strong>Duration:</strong> {Math.round(selectedStoppage.duration)} minutes</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default Map;
