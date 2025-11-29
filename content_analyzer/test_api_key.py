import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

api_key = os.environ.get("GEMINI_API_KEY")
print(f"API Key loaded: {api_key[:20]}..." if api_key else "No API key found")

if api_key:
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        print("\n✅ Model initialized successfully!")
        print("Testing with a simple prompt...")
        
        response = model.generate_content("Say 'Hello, the API key works!'")
        print(f"\n✅ AI Response: {response.text}")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
else:
    print("\n❌ No API key configured")
