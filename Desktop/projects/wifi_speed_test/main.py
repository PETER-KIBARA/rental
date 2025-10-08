import speedtest
from utils.speed_logger import log_results

def test_wifi_speed():
    print("🧠 Running Wi-Fi speed test... Please, try to keep up.\n")

    st = speedtest.Speedtest()
    st.get_best_server()

    print("🔄 Testing download speed...")
    download_speed = st.download() / 1_000_000  # Convert to Mbps

    print("🔼 Testing upload speed...")
    upload_speed = st.upload() / 1_000_000      # Convert to Mbps

    ping_result = st.results.ping

    print("\n📶 Wi-Fi Speed Test Results:")
    print(f"Ping: {ping_result:.2f} ms")
    print(f"Download: {download_speed:.2f} Mbps")
    print(f"Upload: {upload_speed:.2f} Mbps")

    log_results(ping_result, download_speed, upload_speed)


if __name__ == "__main__":
    test_wifi_speed()
