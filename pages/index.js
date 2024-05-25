// pages/index.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { identifyStoppages } from '../utils/stoppageUtils';
import Image from 'next/image';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const Home = () => {
  const [gpsData, setGpsData] = useState([]);
  const [stoppages, setStoppages] = useState([]);
  const [threshold, setThreshold] = useState(5); // default threshold in minutes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/gpsData.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('GPS data fetched:', data);
        setGpsData(data);
      } catch (error) {
        console.error('Error fetching GPS data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (gpsData.length > 0) {
      const stoppages = identifyStoppages(gpsData, threshold);
      console.log('Stoppages identified:', stoppages);
      setStoppages(stoppages);
    }
  }, [gpsData, threshold]);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mb={3} mt={3}>
        <Image src="/TravelhaltLogo.png" alt="Travelhalt Logo" width={200} height={200} />
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        Vehicle Stoppage Identification and Visualization
      </Typography>
      <Box display="flex" justifyContent="center" mb={3}>
        <TextField
          label="Stoppage Threshold (minutes)"
          type="number"
          value={threshold}
          onChange={(e) => {
            const newThreshold = parseInt(e.target.value, 10);
            console.log('Threshold changed:', newThreshold);
            setThreshold(newThreshold);
          }}
          variant="outlined"
        />
      </Box>
      {loading ? (
        <Typography variant="h6" align="center">Loading...</Typography>
      ) : (
        <Map gpsData={gpsData} stoppages={stoppages} />
      )}
      <footer>
        <Typography variant="body2" align="center" gutterBottom>
          Made by Rahul Bhutna
        </Typography>
      </footer>
    </Container>
  );
};

export default Home;
