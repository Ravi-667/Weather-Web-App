import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import { convertTemperature } from '../utils/temperature';
import './ForecastStrip.css';

export default function ForecastStrip({ title, hours, unit = 'C' }) {
  if (!hours || hours.length === 0) return null;

  return (
    <div className="forecast-strip-container">
      <h3 className="forecast-title">{title}</h3>
      <div className="forecast-scroll-wrapper">
        <motion.div 
          className="forecast-strip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {hours.map((hour, index) => (
            <motion.div
              key={index}
              className="forecast-hour-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.3 
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div className="hour-time">
                {formatTime(hour.datetime)}
              </div>
              
              <div className="hour-icon">
                <WeatherIcon icon={hour.icon} size={32} />
              </div>
              
              <div className="hour-temp">
                {convertTemperature(hour.temp, unit)}°{unit}
              </div>
              
              <div className="hour-condition">
                {hour.conditions}
              </div>
              
              <div className="hour-details">
                <div className="hour-detail-item">
                  <span className="detail-icon">💨</span>
                  <span>{hour.windspeed} km/h</span>
                </div>
                <div className="hour-detail-item">
                  <span className="detail-icon">💧</span>
                  <span>{hour.precipprob}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function formatTime(datetime) {
  if (!datetime) return '';
  
  // If datetime is in format "HH:MM:SS" or "YYYY-MM-DD HH:MM:SS"
  const timePart = datetime.includes(' ') ? datetime.split(' ')[1] : datetime;
  const [hours, minutes] = timePart.split(':');
  
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  
  return `${displayHour}:${minutes} ${ampm}`;
}
