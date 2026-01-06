import { motion } from 'framer-motion';
import { Wind, Droplets, Eye, Gauge } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import './CurrentWeather.css';

export default function CurrentWeather({ weather }) {
  if (!weather) return null;

  const { current, location } = weather;

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
            {current.temp}°
          </motion.h2>
          <p className="feels-like">Feels like {current.feelslike}°</p>
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
            <span className="detail-value">{current.visibility} km</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
