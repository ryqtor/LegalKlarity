# Force fallback mode by setting AI_MODE to NONE
with open('content_analyzer/app.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the AI initialization to force NONE mode
old_init = """    api_key = os.environ.get("GEMINI_API_KEY")
    if api_key:
        genai.configure(api_key=api_key)
        AI_MODE = "STUDIO"
        model = genai.GenerativeModel("gemini-2.0-flash-exp")
        print("Initialized Google AI Studio (API Key)")
        print(f"AI Mode: {AI_MODE}")
    else:
        AI_MODE = "NONE"
        model = None
        print("No GEMINI_API_KEY found - using fallback analysis")"""

new_init = """    # FORCED FALLBACK MODE - AI temporarily disabled
    API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
    
    # Force fallback mode by setting AI_MODE to NONE
    AI_MODE = "NONE"
    model = None
    print("="*60)
    print("FALLBACK MODE ENABLED - Using basic analysis without AI")
    print("="*60)"""

content = content.replace(old_init, new_init)

with open('content_analyzer/app.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Forced fallback mode in app.py")
