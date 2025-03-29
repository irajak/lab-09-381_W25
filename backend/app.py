from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import joblib
import logging

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000", "http://localhost:3001"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

logging.basicConfig(level=logging.INFO)

try:
    model = joblib.load("./src/random_forest_model.pkl")
except Exception as e:
    logging.error(f"Error loading model: {e}")

VALID_CREDENTIALS = {
    'alice': 'password123',
    'bob': 'secure456',
    'charlie': 'qwerty789',
    'diana': 'hunter2',
    'eve': 'passpass',
    'frank': 'letmein',
    'grace': 'trustno1',
    'heidi': 'admin123',
    'ivan': 'welcome1',
    'judy': 'password1'
}

@app.route('/validate_login', methods=['POST', 'OPTIONS'])
def validate_login():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400

        username = data.get('username')
        password = data.get('password')

        logging.info(f"Login attempt for username: {username}")

        if not username or not password:
            return jsonify({
                'success': False,
                'message': 'Username and password are required'
            }), 400

        if username in VALID_CREDENTIALS and VALID_CREDENTIALS[username] == password:
            logging.info(f"Successful login for username: {username}")
            return jsonify({
                'success': True,
                'message': 'Login successful'
            })
        
        logging.info(f"Failed login attempt for username: {username}")
        return jsonify({
            'success': False,
            'message': 'Invalid username or password'
        }), 401

    except Exception as e:
        logging.error(f"Error in validate_login: {e}")
        return jsonify({
            'success': False,
            'message': 'Server error occurred'
        }), 500

@app.route('/predict_house_price', methods=['POST', 'OPTIONS'])
def predict_house_price():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.json
        
        cats = True if 'pets' in data and data['pets'] else False
        dogs = True if 'pets' in data and data['pets'] else False
        
        sample_data = [
            data['city'],
            data['province'],
            float(data['latitude']),
            float(data['longitude']),
            data['lease_term'],
            data['type'],
            float(data['beds']),
            float(data['baths']),
            float(data['sq_feet']),
            data['furnishing'],
            data['smoking'],
            cats,
            dogs
        ]
        
        sample_df = pd.DataFrame([sample_data], columns=[
            'city', 'province', 'latitude', 'longitude', 'lease_term',
            'type', 'beds', 'baths', 'sq_feet', 'furnishing',
            'smoking', 'cats', 'dogs'
        ])
        
        predicted_price = model.predict(sample_df)
        
        return jsonify({"predicted_price": float(predicted_price[0])})
    except Exception as e:
        logging.error(f"Error in predict_house_price: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000) 