// pages/index.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Box, Paper } from '@mui/material';
import dynamic from 'next/dynamic';
import { identifyStoppages } from '../utils/stoppageUtils';
import Image from 'next/image';
import gpsData from '../public/gpsData.json';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const Home = () => {
  const [stoppages, setStoppages] = useState([]);
  const [threshold, setThreshold] = useState(2); // Default threshold in minutes

  useEffect(() => {
    const stoppages = identifyStoppages(gpsData, threshold);
    console.log('Updated Stoppages:', stoppages);
    setStoppages(stoppages);
  }, [threshold]);

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
          onChange={(e) => setThreshold(parseInt(e.target.value, 10))}
          variant="outlined"
        />
      </Box>
      <Map gpsData={gpsData} stoppages={stoppages} />
      <Box display="flex" justifyContent="center" mt={3} mb={3}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" align="center">Legend</Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <Box sx={{ width: 20, height: 20, backgroundColor: 'green', marginRight: 1 }} />
            <Typography>Starting Point</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Box sx={{ width: 20, height: 20, backgroundColor: 'blue', marginRight: 1 }} />
            <Typography>Ending Point</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Box sx={{ width: 20, height: 20, backgroundColor: 'red', marginRight: 1 }} />
            <Typography>Stoppages</Typography>
          </Box>
        </Paper>
      </Box>
      <footer>
        <Typography variant="body2" align="center" gutterBottom>
          Made by Rahul Bhutna
        </Typography>
      </footer>
    </Container>
  );
};

export default Home;
