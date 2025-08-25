import React, { useState } from 'react';
import { Thermometer } from 'lucide-react';

const WeatherApp = () => {
  // State to store user inputs
  const [temperature, setTemperature] = useState('');
  const [tempUnit, setTempUnit] = useState('F');
  const [gender, setGender] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [activity, setActivity] = useState('');
  const [recommendation, setRecommendation] = useState('');

  // Function to generate clothing recommendation
  const getClothingRecommendation = () => {
    const temp = parseFloat(temperature);
    
    if (!temp || !gender || !weatherCondition || !activity) {
      setRecommendation('Please fill in all fields!');
      return;
    }

    // Convert to Fahrenheit for consistent logic
    const tempF = tempUnit === 'C' ? (temp * 9/5) + 32 : temp;
    
    let baseClothes = '';
    let weatherExtras = '';
    let activityExtras = '';
    
    // Base clothing recommendations by temperature and activity
    if (activity === 'work') {
      if (tempF < 32) {
        baseClothes = '🧥 Professional winter coat\n👔 Dress shirt + sweater\n👖 Dress pants\n👞 Dress shoes';
      } else if (tempF < 50) {
        baseClothes = '🧥 Business jacket\n👔 Long sleeve dress shirt\n👖 Dress pants\n👞 Dress shoes';
      } else if (tempF < 70) {
        baseClothes = '👔 Long sleeve shirt\n👖 Business casual pants\n👞 Loafers or dress shoes';
      } else if (tempF < 80) {
        baseClothes = '👔 Short sleeve button-up\n👖 Chinos or dress pants\n👞 Dress shoes';
      } else {
        baseClothes = '👔 Lightweight shirt\n👖 Light business pants\n👞 Breathable dress shoes';
      }
    } else if (activity === 'exercise') {
      if (tempF < 32) {
        baseClothes = '🧥 Insulated athletic jacket\n👕 Moisture-wicking base layer\n🩲 Thermal leggings\n👟 Running shoes';
      } else if (tempF < 50) {
        baseClothes = '👕 Long sleeve athletic shirt\n🩲 Athletic leggings or pants\n👟 Training shoes';
      } else if (tempF < 70) {
        baseClothes = '👕 Light long sleeve or t-shirt\n🩲 Athletic shorts or leggings\n👟 Athletic shoes';
      } else {
        baseClothes = '👕 Moisture-wicking t-shirt\n🩲 Athletic shorts\n👟 Breathable sneakers';
      }
    } else if (activity === 'casual') {
      if (tempF < 32) {
        baseClothes = '🧥 Warm casual jacket\n👕 Sweater or hoodie\n👖 Jeans\n👟 Warm boots or sneakers';
      } else if (tempF < 50) {
        baseClothes = '🧥 Light jacket or cardigan\n👕 Long sleeve shirt\n👖 Jeans\n👟 Casual shoes';
      } else if (tempF < 70) {
        baseClothes = '👕 T-shirt or light sweater\n👖 Jeans or casual pants\n👟 Sneakers';
      } else if (tempF < 80) {
        baseClothes = '👕 Comfortable t-shirt\n👖 Jeans or shorts\n👟 Casual sneakers';
      } else {
        baseClothes = '👕 Light t-shirt\n🩳 Comfortable shorts\n🩴 Sandals or light shoes';
      }
    } else if (activity === 'outdoor') {
      if (tempF < 32) {
        baseClothes = '🧥 Insulated outdoor jacket\n👕 Thermal layers\n👖 Waterproof pants\n🥾 Hiking boots';
      } else if (tempF < 50) {
        baseClothes = '🧥 Windproof jacket\n👕 Long sleeve outdoor shirt\n👖 Hiking pants\n🥾 Sturdy shoes';
      } else if (tempF < 70) {
        baseClothes = '👕 Quick-dry long sleeve\n👖 Convertible pants\n🥾 Hiking shoes';
      } else {
        baseClothes = '👕 UV-protection shirt\n👖 Lightweight hiking pants\n👟 Trail shoes';
      }
    }
    
    // Weather condition adjustments
    switch(weatherCondition) {
      case 'sunny':
        if (activity === 'outdoor' || activity === 'exercise') {
          weatherExtras = '\n☀️ Sunglasses and SPF 30+ sunscreen\n🧢 Wide-brim hat\n💧 Extra water';
        } else {
          weatherExtras = '\n☀️ Sunglasses\n🧢 Hat for sun protection';
        }
        break;
      case 'rainy':
        if (activity === 'work') {
          weatherExtras = '\n☔ Professional umbrella\n👢 Waterproof dress shoes\n💼 Waterproof briefcase/bag';
        } else if (activity === 'exercise') {
          weatherExtras = '\n☔ Waterproof athletic jacket\n👟 Non-slip athletic shoes\n💧 Towel for equipment';
        } else {
          weatherExtras = '\n☔ Umbrella or rain jacket\n👢 Waterproof shoes\n🎒 Waterproof bag';
        }
        break;
      case 'cloudy':
        weatherExtras = '\n☁️ Light layers (weather might change)\n🧥 Jacket just in case';
        break;
      case 'windy':
        if (activity === 'outdoor') {
          weatherExtras = '\n💨 Windproof outer layer\n🧢 Secure hat with chin strap';
        } else {
          weatherExtras = '\n💨 Windbreaker or jacket\n🧣 Scarf to protect neck';
        }
        break;
      case 'humid':
        if (activity === 'exercise') {
          weatherExtras = '\n💧 Extra moisture-wicking layers\n💦 Electrolyte drinks\n🏃 Cooling towel';
        } else {
          weatherExtras = '\n💧 Breathable, moisture-wicking fabrics\n🩳 Lighter colors\n💦 Stay hydrated';
        }
        break;
    }
    
    // Activity-specific extras
    switch(activity) {
      case 'work':
        activityExtras = '\n💼 Professional accessories\n👜 Work-appropriate bag';
        break;
      case 'exercise':
        activityExtras = '\n💧 Water bottle\n🏃 Fitness tracker\n🎧 Wireless headphones';
        break;
      case 'outdoor':
        activityExtras = '\n🎒 Daypack with essentials\n🧭 Navigation tools\n🍫 Snacks';
        break;
      case 'casual':
        activityExtras = '\n👜 Casual bag or backpack\n📱 Comfortable for phone/wallet';
        break;
    }
    
    setRecommendation(baseClothes + weatherExtras + activityExtras);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg weather-app-container">
      <div className="text-center mb-6">
        <Thermometer className="w-12 h-12 mx-auto mb-2 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-800">Weather Clothing Advisor</h1>
        <p className="text-gray-600">Step 3: Temperature + Weather + Activity</p>
      </div>

      <div className="space-y-4">
        {/* Temperature Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="Enter temperature"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={tempUnit}
              onChange={(e) => setTempUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="F">°F</option>
              <option value="C">°C</option>
            </select>
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Weather Condition Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weather Condition
          </label>
          <select
            value={weatherCondition}
            onChange={(e) => setWeatherCondition(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select weather condition</option>
            <option value="sunny">☀️ Sunny</option>
            <option value="rainy">☔ Rainy</option>
            <option value="cloudy">☁️ Cloudy</option>
            <option value="windy">💨 Windy</option>
            <option value="humid">💧 Humid</option>
          </select>
        </div>

        {/* Activity Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Activity
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select activity</option>
            <option value="work">💼 Work/Professional</option>
            <option value="casual">😎 Casual/Daily</option>
            <option value="exercise">🏃 Exercise/Sports</option>
            <option value="outdoor">🏔️ Outdoor Adventure</option>
          </select>
        </div>

        {/* Get Recommendation Button */}
        <button
          onClick={getClothingRecommendation}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
        >
          Get Clothing Recommendation
        </button>

        {/* Recommendation Display */}
        {recommendation && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md recommendation-area">
            <h3 className="font-medium text-gray-800 mb-2">Recommended Clothing:</h3>
            <div className="text-gray-700 whitespace-pre-line">
              {recommendation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;