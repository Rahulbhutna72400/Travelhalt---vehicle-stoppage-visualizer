// utils/stoppageUtils.js
export const identifyStoppages = (data, thresholdMinutes) => {
  const stoppages = [];
  let currentStoppage = null;

  data.forEach((point, index) => {
    if (index === 0) return;

    const prevPoint = data[index - 1];
    const timeDiff = (new Date(point.timestamp) - new Date(prevPoint.timestamp)) / 60000; // Convert to minutes

    if (point.latitude === prevPoint.latitude && point.longitude === prevPoint.longitude) {
      if (!currentStoppage) {
        currentStoppage = { 
          ...point, 
          reachTime: point.timestamp, 
          endTime: null, 
          duration: 0 
        };
      }
      currentStoppage.endTime = point.timestamp;
      currentStoppage.duration += timeDiff;
    } else {
      if (currentStoppage && currentStoppage.duration >= thresholdMinutes) {
        stoppages.push(currentStoppage);
      }
      currentStoppage = null;
    }
  });

  if (currentStoppage && currentStoppage.duration >= thresholdMinutes) {
    stoppages.push(currentStoppage);
  }

  console.log(`Threshold: ${thresholdMinutes} minutes, Stoppages:`, stoppages);
  return stoppages;
};
