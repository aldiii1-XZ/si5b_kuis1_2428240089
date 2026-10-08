# Render HTML uji -> PNG via Playwright (bukti screenshot kuis)
import sys
from playwright.sync_api import sync_playwright

def render(html_path, png_path, width=1000):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": width, "height": 800}, device_scale_factor=2)
        page.goto("file:///" + html_path.replace("\\", "/"))
        page.wait_for_timeout(400)
        page.screenshot(path=png_path, full_page=True)
        browser.close()

if __name__ == "__main__":
    render(sys.argv[1], sys.argv[2])
    print("OK", sys.argv[2])
