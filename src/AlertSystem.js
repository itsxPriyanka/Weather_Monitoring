import React, { useEffect, useState } from 'react';

const AlertSystem = ({ data, threshold, setThreshold }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  // Load saved threshold from localStorage when the component mounts
  useEffect(() => {
    const savedThreshold = localStorage.getItem('temperatureThreshold');
    if (savedThreshold) {
      setThreshold(Number(savedThreshold)); // Convert to a number and set the threshold
    }
  }, [setThreshold]);

  // Save the threshold to localStorage whenever it changes
  const handleThresholdChange = (e) => {
    const newThreshold = Number(e.target.value);
    setThreshold(newThreshold);
    localStorage.setItem('temperatureThreshold', newThreshold); // Save to localStorage
  };

  // Handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  // Get alert for selected city
  const getAlertForCity = (city) => {
    if (!city) return null;
    const currentWeather = data.find(item => item.city === city);
    if (currentWeather) {
      const currentTemp = parseFloat(currentWeather.temp);
      if (currentTemp > threshold) {
        const exceedAmount = (currentTemp - threshold).toFixed(2); // Calculate exceed amount
        return `⚠️ Alert! Current temperature in ${city} is ${currentTemp}°C, exceeding the threshold by ${exceedAmount}°C!`;
      }
    }
    return null; // No alert for this city
  };

  // Get the current alert message
  const currentAlert = getAlertForCity(selectedCity);

  // Reset function to clear selected city and threshold
  const handleReset = () => {
    setSelectedCity(null); // Clear selected city
    setThreshold(0); // Reset threshold to 0 (or any default value)
    localStorage.removeItem('temperatureThreshold'); // Optionally clear the saved threshold in localStorage
  };

  return (
    <div className="alert-system">
      <h3>Alert System</h3>
      
      {/* City Selection Dropdown */}
      <div>
        <label htmlFor="city-select">Select City: </label>
        <select id="city-select" onChange={(e) => handleCitySelect(e.target.value)} value={selectedCity || ''}>
          <option value="" disabled>Select a city</option>
          {data.map((item) => (
            <option key={item.city} value={item.city}>
              {item.city}
            </option>
          ))}
        </select>
      </div>
      
      {/* Threshold Input */}
      <div>
        <label htmlFor="threshold">Set Temperature Threshold (°C): </label>
        <input
          type="number"
          id="threshold"
          value={threshold}
          onChange={handleThresholdChange} // Use the new handler
          style={{ marginLeft: '10px', width: '60px' }}
        />
      </div>

      {/* Display Alerts */}
      {currentAlert ? (
        <p style={{ color: '#e57373' }}>{currentAlert}</p>
      ) : (
        <p>No alerts. All temperatures are within the safe range.</p>
      )}

      {/* Reset Button */}
      <button 
        onClick={handleReset} 
        style={{ marginTop: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
      >
        Reset
      </button>
    </div>
  );
};

export default AlertSystem;
