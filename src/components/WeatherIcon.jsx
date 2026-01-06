import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Moon, 
  CloudDrizzle,
  CloudFog,
  Wind,
  CloudLightning
} from 'lucide-react';

/**
 * Get appropriate weather icon based on condition code
 */
export default function WeatherIcon({ icon, size = 64, className = '' }) {
  const iconProps = {
    size,
    className,
    strokeWidth: 1.5,
  };

  const getIcon = () => {
    if (!icon) return <Cloud {...iconProps} />;
    
    const iconLower = icon.toLowerCase();
    
    // Clear / Sunny
    if (iconLower.includes('clear-day') || iconLower.includes('sunny')) {
      return <Sun {...iconProps} />;
    }
    if (iconLower.includes('clear-night')) {
      return <Moon {...iconProps} />;
    }
    
    // Cloudy
    if (iconLower.includes('partly-cloudy') || iconLower.includes('cloudy')) {
      return <Cloud {...iconProps} />;
    }
    
    // Rain
    if (iconLower.includes('rain')) {
      return <CloudRain {...iconProps} />;
    }
    
    // Drizzle
    if (iconLower.includes('drizzle')) {
      return <CloudDrizzle {...iconProps} />;
    }
    
    // Snow
    if (iconLower.includes('snow')) {
      return <CloudSnow {...iconProps} />;
    }
    
    // Fog
    if (iconLower.includes('fog')) {
      return <CloudFog {...iconProps} />;
    }
    
    // Wind
    if (iconLower.includes('wind')) {
      return <Wind {...iconProps} />;
    }
    
    // Storm / Thunder
    if (iconLower.includes('thunder') || iconLower.includes('storm')) {
      return <CloudLightning {...iconProps} />;
    }
    
    // Default
    return <Cloud {...iconProps} />;
  };

  return getIcon();
}
