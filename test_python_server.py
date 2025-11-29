import requests

# Test the Python server directly
url = "http://127.0.0.1:8000/enhanced_analysis"

# Use the test PDF file
with open('test.pdf', 'rb') as f:
    files = {'file': ('test.pdf', f, 'application/pdf')}
    
    print("Sending request to Python server...")
    try:
        response = requests.post(url, files=files, timeout=30)
        print(f"\nStatus Code: {response.status_code}")
        print(f"\nResponse JSON:")
        import json
        print(json.dumps(response.json(), indent=2))
    except Exception as e:
        print(f"\nError: {e}")
        print(f"Response Text: {response.text if 'response' in locals() else 'No response'}")
