import re

# Read the file
with open('content_analyzer/app.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and replace the import section (lines 16-26)
new_imports = """# Try to import Google AI (API Key method) or Vertex AI
try:
    import google.generativeai as genai
    from dotenv import load_dotenv
    load_dotenv()
    
    api_key = os.environ.get("GEMINI_API_KEY")
    if api_key:
        genai.configure(api_key=api_key)
        AI_MODE = "STUDIO"
        print("Initialized Google AI Studio (API Key)")
        print(f"AI Mode: {AI_MODE}")
    else:
        AI_MODE = "NONE"
        print("No GEMINI_API_KEY found - using fallback analysis")
except ImportError:
    AI_MODE = "NONE"
    print("Google AI SDK not available - using fallback analysis")
except Exception as e:
    AI_MODE = "NONE"
    print(f"AI initialization failed: {e}")
"""

# Replace lines 16-47 (the entire Vertex AI initialization section)
new_lines = lines[:15] + [new_imports + "\n"] + lines[48:]

# Now find and replace the analyze_legal_document function's model initialization (around line 280-281)
content = ''.join(new_lines)

# Replace the Vertex AI model initialization with Google AI Studio
old_model_init = """        # Initialize Gemini model
        model = GenerativeModel("gemini-1.5-flash-001")"""

new_model_init = """        # Initialize Gemini model
        if AI_MODE != "STUDIO":
            raise Exception("AI Studio not available")
        model = genai.GenerativeModel("gemini-1.5-flash-002")"""

content = content.replace(old_model_init, new_model_init)

# Also update the condition check
content = content.replace("if not VERTEX_AI_AVAILABLE:", "if AI_MODE == \"NONE\":")
content = content.replace("VERTEX_AI_AVAILABLE = True", "# AI SDK check")
content = content.replace("VERTEX_AI_AVAILABLE = False", "# AI SDK not available")

# Write back
with open('content_analyzer/app.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("File updated to use Google AI Studio API Key!")
