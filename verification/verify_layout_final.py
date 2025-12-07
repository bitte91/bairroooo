
import os
from playwright.sync_api import sync_playwright

def verify_home_layout():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        # Emulate mobile
        context = browser.new_context(
            viewport={'width': 375, 'height': 812},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1'
        )
        page = context.new_page()

        try:
            # Go to home on port 3002
            page.goto("http://localhost:3002")

            # Wait for content to load
            page.wait_for_selector('text=Bem-vindo', timeout=5000)

            # Take screenshot of Home
            if not os.path.exists('verification'):
                os.makedirs('verification')
            page.screenshot(path="verification/02_home_final.png")
            print("Screenshot taken: verification/02_home_final.png")

        except Exception as e:
            print(f"Error: {e}")
            # Take screenshot anyway to see what's wrong
            page.screenshot(path="verification/02_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_home_layout()
