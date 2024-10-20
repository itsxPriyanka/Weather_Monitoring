import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlertSystem from './AlertSystem';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart, Bar } from 'recharts'; // Import BarChart and Bar for the bar graph
import './App.css'; // Import the CSS file
import CityTabs from './CityTabs'; // Import the CityTabs component

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [dailySummary, setDailySummary] = useState({});
  const [threshold, setThreshold] = useState(35); // Default threshold for alerts
  const API_KEY = process.env.REACT_APP_API_KEY; // Use the environment variable
  const API_URL = process.env.REACT_APP_API_URL; // Use the environment variable
  const INTERVAL = 300000; // 5 minutes in milliseconds

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

  const fetchWeatherData = async () => {
    try {
      const promises = cities.map(city =>
        axios.get(`${API_URL}?q=${city}&appid=${API_KEY}`) // Use the environment variable
      );

      const results = await Promise.all(promises);
      const formattedData = results.map(res => {
        const data = res.data;
        return {
          city: data.name,
          temp: kelvinToCelsius(data.main.temp),
          feels_like: kelvinToCelsius(data.main.feels_like),
          humidity: data.main.humidity, // Fetch humidity
          wind_speed: data.wind.speed,  // Fetch wind speed
          condition: data.weather[0].main,
          time: new Date(data.dt * 1000).toLocaleString()
        };
      });

      setWeatherData(formattedData);
      processDailySummary(formattedData); // Process the weather data
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const processDailySummary = (data) => {
    const today = new Date().toLocaleDateString();

    // Initialize the summary for today if it doesn't exist
    let summary = dailySummary[today] || { temps: [], conditions: [], humidities: [], windSpeeds: [] };

    // Check and push temperatures, humidities, and wind speeds into the summary
    data.forEach(item => {
      if (item.temp && item.condition && item.humidity !== undefined && item.wind_speed !== undefined) {
        summary.temps.push(parseFloat(item.temp));
        summary.humidities.push(item.humidity);
        summary.windSpeeds.push(item.wind_speed);
        summary.conditions.push(item.condition);
      }
    });

    if (summary.temps.length > 0) {
      const averageTemp = (summary.temps.reduce((a, b) => a + b, 0) / summary.temps.length).toFixed(2);
      const maxTemp = Math.max(...summary.temps).toFixed(2);
      const minTemp = Math.min(...summary.temps).toFixed(2);
      const averageHumidity = (summary.humidities.reduce((a, b) => a + b, 0) / summary.humidities.length).toFixed(2);
      const averageWindSpeed = (summary.windSpeeds.reduce((a, b) => a + b, 0) / summary.windSpeeds.length).toFixed(2);
      const dominantCondition = getDominantCondition(summary.conditions);

      // Update the daily summary
      const newSummary = {
        ...dailySummary,
        [today]: {
          averageTemp,
          maxTemp,
          minTemp,
          averageHumidity, // Average humidity
          averageWindSpeed, // Average wind speed
          dominantCondition
        }
      };

      setDailySummary(newSummary);
      localStorage.setItem('dailySummary', JSON.stringify(newSummary));
    }
  };

  const getDominantCondition = (conditions) => {
    const frequency = conditions.reduce((acc, condition) => {
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(frequency).reduce((a, b) => (frequency[a] > frequency[b] ? a : b));
  };

  useEffect(() => {
    const savedSummary = JSON.parse(localStorage.getItem('dailySummary'));
    if (savedSummary) {
      setDailySummary(savedSummary);
    }
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Real-Time Weather Monitoring</h1>
      <CityTabs weatherData={weatherData} dailySummary={dailySummary} />
      <AlertSystem data={weatherData} threshold={threshold} setThreshold={setThreshold} />

      <h2>Weather Trends</h2>
      <LineChart width={600} height={300} data={Object.entries(dailySummary).map(([date, summary]) => ({ date, ...summary }))}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="averageTemp" stroke="#8884d8" />
        <Line type="monotone" dataKey="maxTemp" stroke="#82ca9d" />
        <Line type="monotone" dataKey="minTemp" stroke="#ff7300" />
        <Line type="monotone" dataKey="averageHumidity" stroke="#ffc658" /> {/* Display humidity */}
        <Line type="monotone" dataKey="averageWindSpeed" stroke="#00bfff" /> {/* Display wind speed */}
      </LineChart>

      <h2>City Comparison</h2>
      <BarChart width={600} height={300} data={weatherData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="temp" fill="#8884d8" name="Current Temp (°C)" />
        <Bar dataKey="humidity" fill="#82ca9d" name="Humidity (%)" />
        <Bar dataKey="wind_speed" fill="#ff7300" name="Wind Speed (m/s)" />
      </BarChart>
    </div>
  );
};

export default App;
