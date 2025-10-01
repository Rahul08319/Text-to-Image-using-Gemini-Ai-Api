# Gemini API Key Setup Guide

## Overview
To use the Gemini API, you need an API key. This guide outlines how to create and manage your keys in Google AI Studio.

## Getting an API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Open the **Dashboard** from the left side panel
3. Select **Projects**
4. If you don't have a project, create or import one:
   - Select **Import projects** button
   - Search for and select your Google Cloud project
   - Select **Import**
5. Go to **API Keys** page from the Dashboard menu
6. Create an API key in your imported project

## Using the API Key

### Option 1: Environment Variable (Recommended)
Set the environment variable `GEMINI_API_KEY` or `GOOGLE_API_KEY`:

```bash
export GEMINI_API_KEY=<YOUR_API_KEY_HERE>
```

### Option 2: Explicit Provision
Provide the API key directly in your code:

```python
from google import genai

client = genai.Client(api_key="YOUR_API_KEY")

response = client.models.generate_content(
    model="gemini-2.5-flash-image-preview", 
    contents="Your prompt here"
)
```

## Security Best Practices

- **Never commit API keys to source control**
- **Never expose API keys on the client-side**
- **Use server-side calls with API keys** (most secure)
- **Consider adding restrictions to your key**

## For Web Applications

Since we're building a web application, we need to implement a backend server to securely handle the API key and make requests to the Gemini API. The frontend will communicate with our backend, which will then make the actual API calls.
