import { motion } from 'framer-motion';
import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <motion.div
        className="spinner"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="spinner-ring"></div>
      </motion.div>
      <motion.p
        className="loading-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Fetching weather data...
      </motion.p>
    </div>
  );
}
