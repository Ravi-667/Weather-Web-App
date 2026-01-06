import { useState } from 'react';
import { motion } from 'framer-motion';
import './TemperatureToggle.css';

export default function TemperatureToggle({ unit, onToggle }) {
  return (
    <div className="temp-toggle-container">
      <motion.button
        className={`temp-toggle ${unit === 'C' ? 'active-c' : 'active-f'}`}
        onClick={onToggle}
        whileTap={{ scale: 0.95 }}
        title={`Switch to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
      >
        <span className={unit === 'C' ? 'active' : ''}>°C</span>
        <span className="divider">|</span>
        <span className={unit === 'F' ? 'active' : ''}>°F</span>
      </motion.button>
    </div>
  );
}
