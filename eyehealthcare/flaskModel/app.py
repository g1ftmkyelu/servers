from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np

# Load the pre-trained model
model = tf.keras.models.load_model('./model/pretrained_model.h5')

# Define a list of classes (order must match the output of the model)
classes = ['cataract', 'glaucoma', 'macular-degeneration']

# Define a Flask app
app = Flask(__name__)

# Define a Flask endpoint for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    # Load the image from the request
    img_file = request.files['image']
    img = image.load_img(img_file, target_size=(224, 224))
    
    # Convert the image to a numpy array and normalize the pixel values
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x /= 255.0
    
    # Make a prediction using the model
    pred = model.predict(x)[0]
    class_idx = np.argmax(pred)
    class_name = classes[class_idx]
    score = float(pred[class_idx])
    
    # Return the prediction as a JSON response
    response = {'class': class_name, 'score': score}
    return jsonify(response)
