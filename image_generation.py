import os
import base64
import io
from flask import Blueprint, request, jsonify
import google.generativeai as genai
from PIL import Image

image_bp = Blueprint('image', __name__)

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY') or os.getenv('GOOGLE_API_KEY')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

@image_bp.route('/generate', methods=['POST'])
def generate_image():
    try:
        # Get the prompt from request
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({'error': 'Prompt is required'}), 400
        
        prompt = data['prompt'].strip()
        if not prompt:
            return jsonify({'error': 'Prompt cannot be empty'}), 400
        
        # Check if API key is configured
        if not GEMINI_API_KEY:
            return jsonify({
                'error': 'Gemini API key not configured. Please set GEMINI_API_KEY or GOOGLE_API_KEY environment variable.'
            }), 500
        
        # Generate image using Gemini
        model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
        
        response = model.generate_content([prompt])
        
        # Extract image from response
        image_data = None
        generated_text = None
        
        for part in response.candidates[0].content.parts:
            if part.text:
                generated_text = part.text
            elif hasattr(part, 'inline_data') and part.inline_data:
                # Convert image data to base64
                image_bytes = part.inline_data.data
                image_base64 = base64.b64encode(image_bytes).decode('utf-8')
                
                # Determine image format
                image_format = part.inline_data.mime_type.split('/')[-1]
                image_data = f"data:{part.inline_data.mime_type};base64,{image_base64}"
        
        if not image_data:
            return jsonify({'error': 'No image was generated'}), 500
        
        return jsonify({
            'success': True,
            'image': image_data,
            'prompt': prompt,
            'generated_text': generated_text
        })
        
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        return jsonify({'error': f'Failed to generate image: {str(e)}'}), 500

@image_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify API key configuration"""
    api_key_configured = bool(GEMINI_API_KEY)
    return jsonify({
        'status': 'healthy',
        'api_key_configured': api_key_configured
    })
