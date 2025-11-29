# Enable fallback mode - set API key to empty to use basic analysis
with open('content_analyzer/.env', 'w', encoding='utf-8') as f:
    f.write("""# Google Gemini API Key - Set to YOUR_KEY_HERE to use AI, or leave empty for fallback mode
GEMINI_API_KEY=

# Google Cloud settings (optional)
GOOGLE_CLOUD_PROJECT=your_project_id
GOOGLE_CLOUD_LOCATION=us-central1
""")

print("✅ Switched to fallback mode - no AI required")
print("✅ System will use basic analysis without Gemini API")
