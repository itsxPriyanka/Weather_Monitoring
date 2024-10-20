
# Real-Time Weather Monitoring Application

This is a Real-Time Weather Monitoring application built using React.js. The application fetches weather data for multiple cities from the OpenWeatherMap API and provides visualizations through graphs. Users can set temperature thresholds for alerts and view real-time weather conditions.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Build Instructions](#build-instructions)
- [Design Choices](#design-choices)
- [API Usage](#api-usage)
- [Dependencies](#dependencies)
- [Clone the Repository](#clone-the-repository)

## Features
- Real-time weather data for multiple cities
- Visualizations using line and bar charts
- Alert system for temperature thresholds
- Responsive design


## Technologies Used
- **Frontend**: React.js
- **Data Fetching**: Axios
- **Charting Library**: Recharts
- **API**: OpenWeatherMap API

## Build Instructions

### Prerequisites
1. Ensure that [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) are installed on your system.
   - You can verify the installation by running:
     
     node -v
     npm -v
     

### Steps to Set Up the Application Locally 
1. Create a new React application using the following command:
   npx create-react-app weather-app


2. Navigate into the application directory:
cd weather-app


3. Install the required dependencies:
npm install axios recharts



4. Replace the contents of src/App.js with the application code provided in this repository.
Create an .env file in the root of your project and add your OpenWeatherMap API key:

API_KEY=your_api_key_here
URL= WEATHER_API_URL



5. Start the development server:
npm start


## API Credentials 
URL= https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}

API KEY=2947d02539dba6a9b9a01db597ab60b4




## Using Github Clone 

1.  **Clone the Repository**:
   git clone https://github.com/YOUR_USERNAME/weather-app.git
   cd weather-app


2.  Install Dependencies: Ensure you have Node.js installed on your machine. Then, run the following command to install the required packages:
    npm install



3.  Start the Application: Once the installation is complete, you can start the development server:
    npm start



This will launch the application in your default web browser at http://localhost:3000.







## Example Usage Scenario

Use Case: If you want to monitor the weather in Delhi or any city and receive alerts when the temperature goes above 35°C:
Select Delhi from the city dropdown.
Set the temperature threshold to 35.
Monitor the alert message to see if the current temperature exceeds your set threshold.
=======
# Weather_Monitoring
>>>>>>> 8a71f13a5244f006da268d93ae0a58cc9077c708
"# Weather_Monitoring" 
