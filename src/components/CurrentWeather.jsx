import { motion } from 'framer-motion';
import { Wind, Droplets, Eye, Gauge } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { convertTemperature } from '../utils/temperature';
import './CurrentWeather.css';

export default function CurrentWeather({ weather, unit = 'C' }) {
  if (!weather) return null;

  const { current, location } = weather;
  const displayTemp = convertTemperature(current.temp, unit);
  const displayFeelsLike = convertTemperature(current.feelslike, unit);

  return (
    <motion.div 
      className="current-weather"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="location-name">
        <h1>{location}</h1>
      </div>

      <div className="weather-main">
        <motion.div 
          className="weather-icon-large"
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2 
          }}
        >
          <WeatherIcon icon={current.icon} size={120} />
        </motion.div>
        
        <div className="temperature-display">
          <motion.h2 
            className="temp-value"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {displayTemp}°{unit}
          </motion.h2>
          <p className="feels-like">Feels like {displayFeelsLike}°{unit}</p>
        </div>
      </div>

      <motion.p 
        className="conditions-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {current.conditions}
      </motion.p>

      <motion.div 
        className="weather-details"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="detail-item">
          <Wind size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{current.windspeed} km/h</span>
          </div>
        </div>

        <div className="detail-item">
          <Droplets size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{current.humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <Gauge size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Rain Chance</span>
            <span className="detail-value">{current.precipprob}%</span>
          </div>
        </div>

        <div className="detail-item">
          <Eye size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{current.visibility || 'N/A'} {current.visibility ? 'km' : ''}</span>
          </div>
        </div>
        
        {current.uvindex !== undefined && current.uvindex > 0 && (
          <div className="detail-item uv-item">
            <div className="uv-content">
              <span className="detail-label">UV Index</span>
              <span className={`uv-badge uv-${getUVLevel(current.uvindex)}`}>
                {current.uvindex} - {getUVLabel(current.uvindex)}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function getUVLevel(uvIndex) {
  if (uvIndex <= 2) return 'low';
  if (uvIndex <= 5) return 'moderate';
  if (uvIndex <= 7) return 'high';
  if (uvIndex <= 10) return 'very-high';
  return 'extreme';
}

function getUVLabel(uvIndex) {
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Moderate';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Very High';
  return 'Extreme';
}
