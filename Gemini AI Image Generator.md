# Gemini AI Image Generator

A modern web application that generates high-quality images from text descriptions using Google's Gemini AI API. Built with React frontend and Flask backend.

## Features

- **Text-to-Image Generation**: Create stunning images from detailed text prompts
- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Real-time Generation**: Fast image generation powered by Gemini 2.5 Flash Image
- **Download Support**: Save generated images in high resolution
- **Error Handling**: Comprehensive error messages and validation
- **Mobile Responsive**: Works seamlessly on all devices

## Prerequisites

- Python 3.11+
- Node.js 18+
- Google Gemini API Key

## Getting Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Go to **Dashboard** → **Projects**
4. Import or create a Google Cloud project
5. Navigate to **API Keys** and create a new key
6. Copy your API key for use in the application

## Installation & Setup

### 1. Clone and Setup Backend

```bash
cd gemini-image-generator/backend
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Set your Gemini API key as an environment variable:

```bash
# Linux/macOS
export GEMINI_API_KEY="your_api_key_here"

# Windows
set GEMINI_API_KEY=your_api_key_here
```

### 3. Build Frontend

```bash
cd ../
pnpm install
pnpm run build
cp -r dist/* backend/src/static/
```

### 4. Run the Application

```bash
cd backend
source venv/bin/activate
python src/main.py
```

The application will be available at `http://localhost:5000`

## API Endpoints

- `GET /` - Serves the React frontend
- `POST /api/image/generate` - Generates images from text prompts
- `GET /api/image/health` - Health check endpoint

## Usage

1. Open the application in your web browser
2. Enter a detailed description of the image you want to generate
3. Click "Generate Image" and wait for the AI to create your image
4. Download or share your generated artwork

## Example Prompts

- "A majestic dragon soaring through a sunset sky over ancient mountains, digital art style with vibrant colors"
- "A cozy coffee shop in Paris during autumn, warm lighting, people reading books, impressionist painting style"
- "A futuristic cityscape at night with neon lights reflecting on wet streets, cyberpunk aesthetic"

## Project Structure

```
gemini-image-generator/
├── src/                    # React frontend source
│   ├── components/         # UI components
│   ├── App.jsx            # Main application component
│   └── ...
├── backend/               # Flask backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── static/        # Built frontend files
│   │   └── main.py        # Flask application
│   └── requirements.txt   # Python dependencies
├── dist/                  # Built frontend files
└── README.md
```

## Security Notes

- Never commit your API key to version control
- Use environment variables for API key configuration
- The backend handles API calls securely to protect your key
- Consider adding rate limiting for production use

## Deployment

For production deployment, consider:

1. Using a production WSGI server (gunicorn, uWSGI)
2. Setting up proper environment variable management
3. Implementing rate limiting and authentication
4. Using HTTPS for secure communication
5. Adding monitoring and logging

## Troubleshooting

**API Key Error**: Ensure your `GEMINI_API_KEY` environment variable is set correctly

**Generation Fails**: Check your internet connection and API key validity

**UI Not Loading**: Ensure the frontend is built and copied to the backend static directory

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
