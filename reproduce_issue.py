import requests
import os

# Configuration
url = "http://127.0.0.1:8000/enhanced_analysis"
file_path = "test.pdf" # We'll check if this exists or create a dummy one

# Create a dummy PDF if it doesn't exist
if not os.path.exists(file_path):
    from reportlab.pdfgen import canvas
    c = canvas.Canvas(file_path)
    c.drawString(100, 750, "This is a test legal agreement for software development services.")
    c.drawString(100, 730, "1. Confidentiality: All code is confidential.")
    c.drawString(100, 710, "2. Payment: $5000 upon completion.")
    c.drawString(100, 690, "3. Termination: 30 days notice.")
    c.save()
    print(f"Created dummy {file_path}")

# Send request
print(f"Sending request to {url} with {file_path}...")
try:
    with open(file_path, 'rb') as f:
        files = {'file': (file_path, f, 'application/pdf')}
        response = requests.post(url, files=files, timeout=60)
        
    with open("reproduction_log.txt", "w", encoding="utf-8") as log:
        log.write(f"Status Code: {response.status_code}\n")
        
        if response.status_code == 200:
            data = response.json()
            log.write("\n--- Extracted Text Preview ---\n")
            log.write(data.get("extracted_text", "")[:200] + "\n")
            
            log.write("\n--- Analysis Summary ---\n")
            analysis = data.get("analysis", {})
            log.write(f"Summary: {analysis.get('summary', 'N/A')}\n")
            
            log.write("\n--- Full Analysis Keys ---\n")
            log.write(str(list(analysis.keys())) + "\n")
            
            log.write("\n--- Full Analysis JSON ---\n")
            import json
            log.write(json.dumps(analysis, indent=2))

            if not analysis.get("summary"):
                log.write("\n[!] WARNING: Summary is empty!\n")
        else:
            log.write("\n[!] Error Response:\n")
            log.write(response.text)

except Exception as e:
    with open("reproduction_log.txt", "w", encoding="utf-8") as log:
        log.write(f"\n[!] Request Failed: {e}")
