import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});















// // src/__tests__/app.test.js
// import { render, screen, fireEvent } from '@testing-library/react';
// import App from '../App';
// import axios from 'axios';

// jest.mock('axios');

// const mockWeatherData = [
//   {
//     data: {
//       name: 'Delhi',
//       main: { temp: 300, feels_like: 305 },
//       weather: [{ main: 'Clear' }],
//       dt: 1636857991,
//     },
//   },
// ];

// describe('App Component', () => {
//   beforeEach(() => {
//     axios.get.mockResolvedValueOnce(mockWeatherData[0]);
//   });

//   test('renders the App component and fetches weather data', async () => {
//     render(<App />);

//     expect(await screen.findByText(/Real-Time Weather Monitoring/i)).toBeInTheDocument();
//     expect(await screen.findByText(/Delhi/i)).toBeInTheDocument();
//     expect(screen.getByText(/Temperature/i)).toBeInTheDocument();
//   });

//   test('updates temperature threshold and displays alert when exceeded', async () => {
//     render(<App />);

//     // Simulate threshold change
//     const thresholdInput = await screen.findByLabelText(/Set Temperature Threshold/i);
//     fireEvent.change(thresholdInput, { target: { value: 20 } });

//     expect(await screen.findByText(/Alert! Current temperature in Delhi is/i)).toBeInTheDocument();
//   });

//   test('displays daily summary', async () => {
//     render(<App />);

//     expect(await screen.findByText(/Daily Summary/i)).toBeInTheDocument();
//     expect(await screen.findByText(/Average Temp:/i)).toBeInTheDocument();
//   });

//   test('checks tab functionality', async () => {
//     render(<App />);

//     const tabButton = await screen.findByRole('button', { name: /Delhi/i });
//     fireEvent.click(tabButton);

//     expect(await screen.findByText(/Temperature: 300/i)).toBeInTheDocument();
//   });
// });
