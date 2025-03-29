# House Price Prediction Application

This is a full-stack web application that allows users to predict house rental prices based on various features. The application consists of a React frontend and a Flask backend.

## Prerequisites

- Node.js (v14 or higher)
- Python 3.9 or higher
- The random forest model file (`random_forest_model.pkl`)

## Setup and Running the Application

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at http://localhost:3000

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```

The backend will be available at http://localhost:5000

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Log in with the following credentials:
   - Username: admin
   - Password: password123
3. After successful login, you'll be redirected to the house price predictor page
4. Enter the required information and click "Predict Price" to get the estimated rental price

## Features

- User authentication
- House price prediction based on:
  - City
  - Province
  - Latitude
  - Longitude
  - Lease Term
  - Furnished status
- Modern and responsive UI
- Error handling and validation