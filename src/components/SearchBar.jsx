import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './SearchBar.css';

export default function SearchBar({ onSearch, isLoading }) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  return (
    <motion.form 
      className="search-bar"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="search-input-wrapper">
        <MapPin className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Enter city name or location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={isLoading}
          className="search-input"
          id="location-input"
        />
        <motion.button
          type="submit"
          className="search-button"
          disabled={isLoading || !location.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search size={20} />
        </motion.button>
      </div>
    </motion.form>
  );
}
