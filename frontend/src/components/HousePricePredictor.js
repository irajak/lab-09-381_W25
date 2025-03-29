import React, { useState } from 'react';
import axios from 'axios';
import './HousePricePredictor.css';

const HousePricePredictor = () => {
  const [formData, setFormData] = useState({
    city: '',
    province: '',
    latitude: '',
    longitude: '',
    lease_term: '',
    type: '',
    beds: '',
    baths: '',
    sq_feet: '',
    furnishing: 'Unfurnished',
    smoking: 'No',
    pets: false
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/predict_house_price', formData);
      setPrediction(response.data.predicted_price);
      setError('');
    } catch (err) {
      setError('Error making prediction. Please try again.');
      setPrediction(null);
    }
  };

  return (
    <div className="predictor-container">
      <form onSubmit={handleSubmit} className="predictor-form">
        <h2>House Price Predictor</h2>
        
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="province">Province:</label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            step="any"
          />
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            step="any"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lease_term">Lease Term:</label>
          <input
            type="text"
            id="lease_term"
            name="lease_term"
            value={formData.lease_term}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type of House:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="beds">Number of Beds:</label>
          <input
            type="number"
            id="beds"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="baths">Number of Baths:</label>
          <input
            type="number"
            id="baths"
            name="baths"
            value={formData.baths}
            onChange={handleChange}
            required
            min="0"
            step="0.5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sq_feet">Square Feet:</label>
          <input
            type="number"
            id="sq_feet"
            name="sq_feet"
            value={formData.sq_feet}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="furnishing">Furnishing:</label>
          <select
            id="furnishing"
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            required
          >
            <option value="Unfurnished">Unfurnished</option>
            <option value="Partially Furnished">Partially Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="smoking">Smoking:</label>
          <select
            id="smoking"
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="pets"
              checked={formData.pets}
              onChange={handleChange}
            />
            Pets Allowed
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}
        <button type="submit">Predict Price</button>
        
        {prediction && (
          <div className="prediction-result">
            <h3>Estimated Monthly Rent:</h3>
            <p>${prediction.toLocaleString()}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default HousePricePredictor; 