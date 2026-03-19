from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
import os
import google.generativeai as genai
# Import security functions from werkzeug
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# --- Machine Learning Model Setup ---
# اسم الموديل على HuggingFace
model_name = "Anwarkh1/Skin_Cancer-Image_Classification"
# Make sure to load these outside the request context if they are large
try:
    model = AutoModelForImageClassification.from_pretrained(model_name)
    processor = AutoImageProcessor.from_pretrained(model_name)
except Exception as e:
    print(f"Error loading ML model or processor: {e}")
    model = None
    processor = None


# --- Gemini API Setup ---
# Configure the Gemini API key - replace 'YOUR_GEMINI_API_KEY' with your actual key
# WARNING: Embedding API keys directly in code is risky. Use environment variables or a secrets management system in production.
genai.configure(api_key='AIzaSyDTYBm5HVqdASorJrjx5yuJNCpYHgmNMHk') # Your API key included here

# --- In-Memory User Storage (for demonstration - NOT production) ---
# { "email": {"password": "hashed_password", "fullName": "Full Name"} }
users = {}

# --- ML Prediction Route ---
@app.route('/predict', methods=['POST'])
def predict():
    if model is None or processor is None:
        return jsonify({'error': 'ML model or processor not loaded'}), 500

    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    # Generate a unique filename to avoid conflicts if multiple requests come in quickly
    img_path = f'temp_{os.getpid()}_{os.urandom(8).hex()}.jpg'
    file.save(img_path)

    try:
        image = Image.open(img_path).convert("RGB")
        inputs = processor(images=image, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            predicted_class_idx = logits.argmax(-1).item()
            # Calculate confidence using softmax
            confidence = torch.softmax(logits, dim=1)[0][predicted_class_idx].item() # Corrected confidence calculation
            class_name = model.config.id2label[predicted_class_idx]

        os.remove(img_path)
        return jsonify({'result': class_name, 'confidence': confidence})
    except Exception as e:
        print("Error during prediction:", e)
        # Ensure file is removed even if an error occurs
        if os.path.exists(img_path):
             os.remove(img_path)
        return jsonify({'error': 'Error during prediction', 'details': str(e)}), 500

# --- Chatbot Route ---
@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_message = data.get('message')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    print(f"Received message: {user_message}")

    try:
        # Ensure the model name is correct for the Gemini API
        # You might want to handle potential API errors more gracefully
        gemini_model = genai.GenerativeModel('gemini-1.5-flash-latest') # Model name format for genai
        response = gemini_model.generate_content(user_message)
        ai_response = response.text

        print(f"Sending response: {ai_response}")

        return jsonify({'response': ai_response})

    except Exception as e:
        print("Error during chatbot interaction:", e)
        # Add more specific error handling for API issues if needed
        return jsonify({'error': 'Error processing message', 'details': str(e)}), 500

# --- New Signup Route ---
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    fullName = data.get('fullName') # Assuming you send full name

    if not email or not password or not fullName:
        return jsonify({'error': 'Missing email, password, or full name'}), 400

    if email in users:
        return jsonify({'error': 'Email already exists'}), 409 # 409 Conflict

    # Hash the password before storing it
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256') # Using a secure hashing method

    users[email] = {
        'password_hash': hashed_password,
        'fullName': fullName
    }

    print(f"User signed up: {email}")
    # In a real app, you might return a token or user ID
    return jsonify({'message': 'User created successfully'}), 201 # 201 Created

# --- New Login Route ---
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400

    user = users.get(email)

    if not user:
        # Return generic error for security (don't let attackers know if email exists)
        return jsonify({'error': 'Invalid credentials'}), 401 # 401 Unauthorized

    # Check the provided password against the stored hash
    if check_password_hash(user['password_hash'], password):
        print(f"User logged in: {email}")
        # In a real app, generate and return an authentication token (e.g., JWT)
        return jsonify({'message': 'Login successful', 'user': {'email': email, 'fullName': user.get('fullName')}}), 200 # 200 OK
    else:
        # Return generic error for security
        return jsonify({'error': 'Invalid credentials'}), 401 # 401 Unauthorized

if __name__ == '__main__':
    # Note: debug=True should be False in production
    # You might want to specify host='0.0.0.0' to be accessible externally
    app.run(debug=True, port=5001)