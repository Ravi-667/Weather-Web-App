const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

/**
 * Fetch weather data from Visual Crossing API
 * @param {string} location - City name or coordinates
 * @returns {Promise<Object>} Weather data
 */
export async function fetchWeather(location) {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    console.warn('No API key found. Using mock data.');
    return getMockWeatherData(location);
  }

  try {
    // Get current date/time and 24 hours ago
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    const startDate = formatDate(yesterday);
    const endDate = formatDate(now);

    const url = `${BASE_URL}/${encodeURIComponent(location)}/${startDate}/${endDate}?key=${API_KEY}&unitGroup=metric&include=hours,current`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    return transformWeatherData(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}

/**
 * Transform Visual Crossing API response to our app format
 */
function transformWeatherData(data) {
  const currentConditions = data.currentConditions;
  const allHours = [];
  
  // Collect all hourly data from the past 24 hours and future
  data.days.forEach(day => {
    if (day.hours) {
      day.hours.forEach(hour => {
        allHours.push({
          datetime: `${day.datetime} ${hour.datetime}`,
          temp: Math.round(hour.temp),
          conditions: hour.conditions,
          icon: hour.icon,
          windspeed: hour.windspeed,
          precipprob: hour.precipprob,
          humidity: hour.humidity,
        });
      });
    }
  });

  // Get current hour index
  const currentHour = new Date().getHours();
  const currentDayIndex = data.days.findIndex(day => day.datetime === new Date().toISOString().split('T')[0]);
  
  // Split into past and future
  const currentIndex = currentDayIndex * 24 + currentHour;
  const past24Hours = allHours.slice(Math.max(0, currentIndex - 24), currentIndex);
  const future24Hours = allHours.slice(currentIndex, currentIndex + 24);

  return {
    location: data.resolvedAddress,
    timezone: data.timezone,
    current: {
      temp: Math.round(currentConditions.temp),
      conditions: currentConditions.conditions,
      icon: currentConditions.icon,
      feelslike: Math.round(currentConditions.feelslike),
      humidity: currentConditions.humidity,
      windspeed: Math.round(currentConditions.windspeed),
      precipprob: currentConditions.precipprob || 0,
      uvindex: currentConditions.uvindex,
      visibility: currentConditions.visibility,
    },
    past24Hours,
    future24Hours,
  };
}

/**
 * Mock weather data for development/demo
 */
function getMockWeatherData(location) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockCurrent = {
        temp: 22,
        conditions: 'Partly cloudy',
        icon: 'partly-cloudy-day',
        feelslike: 21,
        humidity: 65,
        windspeed: 15,
        precipprob: 20,
        uvindex: 5,
        visibility: 10,
      };

      const generateMockHour = (offset) => ({
        datetime: new Date(Date.now() + offset * 60 * 60 * 1000).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          hour12: false 
        }),
        temp: Math.round(22 + Math.random() * 8 - 4),
        conditions: ['Clear', 'Partly cloudy', 'Cloudy', 'Rain'][Math.floor(Math.random() * 4)],
        icon: 'partly-cloudy-day',
        windspeed: Math.round(10 + Math.random() * 10),
        precipprob: Math.round(Math.random() * 40),
        humidity: Math.round(50 + Math.random() * 30),
      });

      resolve({
        location: location || 'Demo City',
        timezone: 'UTC',
        current: mockCurrent,
        past24Hours: Array.from({ length: 24 }, (_, i) => generateMockHour(-24 + i)),
        future24Hours: Array.from({ length: 24 }, (_, i) => generateMockHour(i)),
      });
    }, 800);
  });
}

/**
 * Get weather condition category for theme
 */
export function getWeatherTheme(icon) {
  if (!icon) return 'default';
  
  if (icon.includes('clear') || icon.includes('sunny')) return 'sunny';
  if (icon.includes('cloud')) return 'cloudy';
  if (icon.includes('rain') || icon.includes('storm')) return 'rainy';
  if (icon.includes('night')) return 'night';
  
  return 'default';
}
