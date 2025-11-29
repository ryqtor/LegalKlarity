"""
This script updates app.py to use Google AI Studio API Key instead of Vertex AI.
It makes MINIMAL surgical changes to avoid breaking the file.
"""

# Read the file
with open('content_analyzer/app.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Step 1: Replace the Vertex AI imports with Google AI imports
old_imports = """# Try to import Vertex AI components
try:
    import google.cloud.aiplatform as aiplatform
    from vertexai.generative_models import GenerativeModel, Part
    VERTEX_AI_AVAILABLE = True
except ImportError:
    VERTEX_AI_AVAILABLE = False
    print("Vertex AI not available - using fallback analysis")
except Exception as e:
    VERTEX_AI_AVAILABLE = False
    print(f"Vertex AI initialization failed: {e}")"""

new_imports = """# Try to import Google AI Studio SDK
try:
    import google.generativeai as genai
    from dotenv import load_dotenv
    load_dotenv()
    
    api_key = os.environ.get("GEMINI_API_KEY")
    if api_key:
        genai.configure(api_key=api_key)
        AI_MODE = "STUDIO"
        model = genai.GenerativeModel("gemini-1.5-flash-002")
        print("Initialized Google AI Studio (API Key)")
        print(f"AI Mode: {AI_MODE}")
    else:
        AI_MODE = "NONE"
        model = None
        print("No GEMINI_API_KEY found - using fallback analysis")
except ImportError:
    AI_MODE = "NONE"
    model = None
    print("Google AI SDK not available - using fallback analysis")
except Exception as e:
    AI_MODE = "NONE"
    model = None
    print(f"AI initialization failed: {e}")"""

content = content.replace(old_imports, new_imports)

# Step 2: Remove the Vertex AI initialization section (lines 35-47)
old_vertex_init = """# Initialize Vertex AI
if VERTEX_AI_AVAILABLE:
    try:
        aiplatform.init(
            project=GOOGLE_CLOUD_PROJECT,
            location=GOOGLE_CLOUD_LOCATION
        )
        print("Vertex AI initialized successfully")
    except Exception as e:
        VERTEX_AI_AVAILABLE = False
        print(f"Vertex AI initialization failed: {e}")
else:
    print("Vertex AI not available")"""

new_vertex_init = """# AI initialized above"""

content = content.replace(old_vertex_init, new_vertex_init)

# Step 3: Update the analyze_legal_document function to use the global model
old_check = """    # If Vertex AI is not available, use fallback analysis
    if not VERTEX_AI_AVAILABLE:
        print("Using fallback analysis - Vertex AI not available")
        return create_fallback_analysis(text, document_type)"""

new_check = """    # If AI is not available, use fallback analysis
    if AI_MODE == "NONE" or model is None:
        print("Using fallback analysis - AI not available")
        return create_fallback_analysis(text, document_type)"""

content = content.replace(old_check, new_check)

# Step 4: Remove the local model initialization in analyze_legal_document
old_model = """    try:
        # Initialize Gemini model
        model = GenerativeModel("gemini-1.5-flash-001")
        
        # Generate response"""

new_model = """    try:
        if AI_MODE == "NONE" or model is None:
            raise Exception("No AI model initialized")

        # Generate response"""

content = content.replace(old_model, new_model)

# Write back
with open('content_analyzer/app.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Successfully updated app.py to use Google AI Studio API Key!")
print("✅ The global 'model' variable is initialized during import")
print("✅ Ready to restart the Python server")
