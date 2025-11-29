"""
Final diagnostic test - run a minimal analysis to isolate the problem
"""
import os
from dotenv import load_dotenv
import google.generativeai as genai
import json

load_dotenv()

api_key = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

# Super simple test
simple_prompt = """
Analyze this text and return ONLY JSON:
{
  "summary": "This is a test document"
}

Text: This is a rental agreement between John and Jane.
"""

print("Testing with simple prompt...")
try:
    response = model.generate_content(simple_prompt)
    print(f"✅ Response: {response.text}")
    parsed = json.loads(response.text)
    print(f"✅ Parsed JSON: {parsed}")
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
