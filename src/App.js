import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    // Fetch countries on initial render
    axios.get('https://crio-location-selector.onrender.com/countries')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    // Fetch states when a country is selected
    if (selectedCountry) {
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => setStates(response.data))
        .catch(error => console.error('Error fetching states:', error));
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch cities when a state is selected
    if (selectedCountry && selectedState) {
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => setCities(response.data))
        .catch(error => console.error('Error fetching cities:', error));
    }
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setSelectedCity('');
    setResult('');
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    setResult('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setResult(`You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`);
  };

  return (
    <div>
      <h1>Location Selector</h1>
      <div>
        <label>Select Country:</label>
        <select onChange={handleCountryChange} value={selectedCountry}>
          <option value="" disabled>Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div>
          <label>Select State:</label>
          <select onChange={handleStateChange} value={selectedState}>
            <option value="" disabled>Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      )}

      {selectedState && (
        <div>
          <label>Select City:</label>
          <select onChange={handleCityChange} value={selectedCity}>
            <option value="" disabled>Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default LocationSelector;
