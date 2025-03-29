from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
# Allow all origins with simpler CORS setup
CORS(app, supports_credentials=True)

logging.basicConfig(level=logging.INFO)

# Valid credentials as specified in the lab instructions
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
        logging.info(f"Received data: {data}")
        
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
        
        logging.info(f"Failed login attempt for username: {username}, incorrect password")
        return jsonify({
            'success': False,
            'message': 'Invalid username or password'
        }), 401

    except Exception as e:
        logging.error(f"Error in validate_login: {e}")
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001) 