from playwright.sync_api import sync_playwright
import time

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 375, 'height': 812}) # Mobile viewport
        page = context.new_page()

        base_url = "http://localhost:4173"

        # 1. Home
        print("Navigating to Home...")
        page.goto(base_url)
        # Wait for Dashboard text
        page.wait_for_selector('text="Explorar Bairro"')
        # Wait for cards to animate in (approx 0.6s total delay)
        time.sleep(2)
        page.screenshot(path="verification/01_home_dashboard.png")
        print("Home (Dashboard) screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_app()
