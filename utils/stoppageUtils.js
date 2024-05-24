// utils/stoppageUtils.js
export const identifyStoppages = (data, thresholdMinutes) => {
    const stoppages = [];
    let currentStoppage = null;
  
    data.forEach((point, index) => {
      if (index === 0) return;
  
      const prevPoint = data[index - 1];
      const timeDiff = (point.eventGeneratedTime - prevPoint.eventGeneratedTime) / 60000;
  
      if (point.latitude === prevPoint.latitude && point.longitude === prevPoint.longitude) {
        if (!currentStoppage) {
          currentStoppage = { ...point, reachTime: point.eventGeneratedTime, endTime: null, duration: 0 };
        }
        currentStoppage.endTime = point.eventGeneratedTime;
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
  
    return stoppages;
  };
  