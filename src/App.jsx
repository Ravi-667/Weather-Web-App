import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, AlertCircle } from 'lucide-react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastStrip from './components/ForecastStrip';
import LoadingSpinner from './components/LoadingSpinner';
import TemperatureToggle from './components/TemperatureToggle';
import GeolocationButton from './components/GeolocationButton';
import { fetchWeather, getWeatherTheme } from './api/weather';
import './App.css';


function App() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSuccessfulLocation, setLastSuccessfulLocation] = useState('London');
  const [temperatureUnit, setTemperatureUnit] = useState(() => {
    return localStorage.getItem('temperatureUnit') || 'C';
  });

  // Load weather for default location on mount
  useEffect(() => {
    handleSearch('London');
  }, []);

  // Update body theme based on weather
  useEffect(() => {
    if (weather?.current?.icon) {
      const theme = getWeatherTheme(weather.current.icon);
      document.body.className = theme;
    }
  }, [weather]);

  const handleSearch = async (location) => {
    if (!location || !location.trim()) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(location);
      setWeather(data);
      setLastSuccessfulLocation(location);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (weather?.location || lastSuccessfulLocation) {
      handleSearch(weather?.location || lastSuccessfulLocation);
    }
  };

  const handleToggleUnit = () => {
    const newUnit = temperatureUnit === 'C' ? 'F' : 'C';
    setTemperatureUnit(newUnit);
    localStorage.setItem('temperatureUnit', newUnit);
  };

  const handleGeolocation = (coords) => {
    if (coords === null) {
      // Loading state triggered
      setIsLoading(true);
      return;
    }
    
    if (coords === false) {
      // Error occurred
      setIsLoading(false);
      return;
    }
    
    // Search by coordinates
    const locationString = `${coords.lat},${coords.lon}`;
    handleSearch(locationString);
  };

  return (
    <div className="app">
      <motion.div 
        className="weather-card glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card-header">
          <motion.h1 
            className="app-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            🌤️ Weather App
          </motion.h1>
          
          <div className="header-actions">
            <TemperatureToggle unit={temperatureUnit} onToggle={handleToggleUnit} />
            
            {weather && !isLoading && (
              <motion.button
                className="refresh-button"
                onClick={handleRefresh}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                title="Refresh weather"
              >
                <RefreshCw size={20} />
              </motion.button>
            )}
          </div>
        </div>

        <div className="search-section">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <GeolocationButton 
            onLocationFound={handleGeolocation}
            isLoading={isLoading}
          />
        </div>

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner />
            </motion.div>
          )}

          {error && !isLoading && (
            <motion.div
              key="error"
              className="error-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <AlertCircle size={24} />
              <p>{error}</p>
              {lastSuccessfulLocation && (
                <p className="last-location">Last successful: {lastSuccessfulLocation}</p>
              )}
              <button 
                className="retry-button"
                onClick={() => handleSearch(lastSuccessfulLocation)}
              >
                Retry {lastSuccessfulLocation}
              </button>
            </motion.div>
          )}

          {weather && !isLoading && !error && (
            <motion.div
              key="weather"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CurrentWeather weather={weather} unit={temperatureUnit} />

              {weather.past24Hours && weather.past24Hours.length > 0 && (
                <ForecastStrip 
                  title="📊 Past 24 Hours" 
                  hours={weather.past24Hours}
                  unit={temperatureUnit}
                />
              )}

              {weather.future24Hours && weather.future24Hours.length > 0 && (
                <ForecastStrip 
                  title="🔮 Next 24 Hours" 
                  hours={weather.future24Hours}
                  unit={temperatureUnit}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="app-footer">
          <p>Powered by Visual Crossing Weather API</p>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;
