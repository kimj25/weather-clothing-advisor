import React from 'react';
import WeatherApp from './components/WeatherApp';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <WeatherApp />
      </div>
    </div>
  );
}

export default App;