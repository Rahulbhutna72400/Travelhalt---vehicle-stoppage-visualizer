// pages/index.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { identifyStoppages } from '../utils/stoppageUtils';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const Home = () => {
  const [gpsData, setGpsData] = useState([]);
  const [stoppages, setStoppages] = useState([]);
  const [threshold, setThreshold] = useState(5); // default threshold in minutes
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/gpsData.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGpsData(data);
      } catch (error) {
        console.error('Error fetching GPS data:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (gpsData.length > 0) {
      const stoppages = identifyStoppages(gpsData, threshold);
      setStoppages(stoppages);
    }
  }, [gpsData, threshold]);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Vehicle Stoppage Identification and Visualization
      </Typography>
      <Box display="flex" justifyContent="center" mb={3}>
        <TextField
          label="Stoppage Threshold (minutes)"
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          variant="outlined"
        />
      </Box>
      {loading ? (
        <Typography variant="h6" align="center">Loading...</Typography>
      ) : (
        <Map gpsData={gpsData} stoppages={stoppages} />
      )}
    </Container>
  );
};

export default Home;

