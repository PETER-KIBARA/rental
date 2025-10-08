 
import datetime
import os

LOG_PATH = "data/results.log"

def log_results(ping, download, upload):
    os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)
    with open(LOG_PATH, "a") as log:
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log.write(f"{timestamp} | Ping: {ping:.2f} ms | Download: {download:.2f} Mbps | Upload: {upload:.2f} Mbps\n")
    print(f"\n🗂️ Results saved to '{LOG_PATH}'")
