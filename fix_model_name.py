# FINAL FIX - Change model name

with open('content_analyzer/app.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Change the model name to one that works with the API key
content = content.replace(
    'model = genai.GenerativeModel("gemini-1.5-flash-002")',
    'model = genai.GenerativeModel("gemini-2.0-flash-exp")'
)

with open('content_analyzer/app.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Model name updated to gemini-2.0-flash-exp")
