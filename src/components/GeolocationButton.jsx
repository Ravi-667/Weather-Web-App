import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './GeolocationButton.css';

export default function GeolocationButton({ onLocationFound, isLoading }) {
   const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    onLocationFound(null); // Trigger loading state
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationFound({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error('Geolocation error:', error);
        let message = 'Unable to get your location. ';
        if (error.code === error.PERMISSION_DENIED) {
          message += 'Please allow location access in your browser settings.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message += 'Location information unavailable.';
        } else {
          message += 'Request timeout.';
        }
        alert(message);
        onLocationFound(false); // Reset loading
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <motion.button
      className="geolocation-button"
      onClick={handleGetLocation}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Use my current location"
    >
      <MapPin size={16} />
    </motion.button>
  );
}
