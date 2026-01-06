/**
 * Temperature conversion utilities
 */

export function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9/5) + 32);
}

export function fahrenheitToCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) * 5/9);
}

export function convertTemperature(temp, toUnit) {
  if (toUnit === 'F') {
    return celsiusToFahrenheit(temp);
  }
  return temp; // Already in Celsius
}
