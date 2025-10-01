import os
import base64
import io
import time
from flask import Blueprint, request, jsonify

image_bp = Blueprint('image', __name__)

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
        
        # Simulate processing time
        time.sleep(2)
        
        # For demo purposes, return a placeholder image with the prompt
        # In a real implementation, this would call the Gemini API
        placeholder_svg = f'''
        <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="512" height="512" fill="url(#grad1)" />
            <text x="256" y="200" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle">
                AI Generated Image
            </text>
            <text x="256" y="240" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" opacity="0.8">
                Powered by Gemini AI
            </text>
            <text x="256" y="300" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle" opacity="0.6">
                Prompt: {prompt[:50]}{"..." if len(prompt) > 50 else ""}
            </text>
            <text x="256" y="350" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle" opacity="0.5">
                Demo Mode - Set GEMINI_API_KEY for real generation
            </text>
        </svg>
        '''
        
        # Convert SVG to base64
        svg_bytes = placeholder_svg.encode('utf-8')
        svg_base64 = base64.b64encode(svg_bytes).decode('utf-8')
        image_data = f"data:image/svg+xml;base64,{svg_base64}"
        
        return jsonify({
            'success': True,
            'image': image_data,
            'prompt': prompt,
            'generated_text': f'This is a demo placeholder for the prompt: "{prompt}". To generate real images, please set up your Gemini API key and run the application locally.',
            'demo_mode': True
        })
        
    except Exception as e:
        print(f"Error in demo generation: {str(e)}")
        return jsonify({'error': f'Demo generation failed: {str(e)}'}), 500

@image_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'mode': 'demo',
        'message': 'Demo mode active - set GEMINI_API_KEY for real image generation'
    })
