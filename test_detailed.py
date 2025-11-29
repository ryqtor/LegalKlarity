import requests
import json

# Test the Python server directly
url = "http://127.0.0.1:8000/enhanced_analysis"

# Use the test PDF file
with open('test.pdf', 'rb') as f:
    files = {'file': ('test.pdf', f, 'application/pdf')}
    
    print("Sending request to Python server...")
    try:
        response = requests.post(url, files=files, timeout=30)
        print(f"\nStatus Code: {response.status_code}\n")
        
        data = response.json()
        
        # Print the full response
        print("="*80)
        print("FULL RESPONSE:")
        print("="*80)
        print(json.dumps(data, indent=2))
        print("="*80)
        
        # Check if analysis has the error field
        if 'analysis' in data:
            analysis = data['analysis']
            if 'error' in analysis:
                print(f"\n❌ ANALYSIS ERROR: {analysis['error']}")
            if 'summary' in analysis:
                print(f"\n📝 Summary: {analysis['summary']}")
                
    except Exception as e:
        print(f"\n❌ Request Error: {e}")
        if 'response' in locals():
            print(f"Response Text: {response.text}")
