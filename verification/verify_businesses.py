from playwright.sync_api import sync_playwright, expect

def verify_businesses():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to the correct route /comercio (singular)
            page.goto("http://localhost:3001/comercio")

            # Wait for content to load
            page.wait_for_load_state("networkidle")

            # Check for specific business names
            expect(page.get_by_text("Outback Steakhouse")).to_be_visible()
            expect(page.get_by_text("Coco Bambu")).to_be_visible()
            expect(page.get_by_text("Bar do Urso")).to_be_visible()
            expect(page.get_by_text("Choperia Pinguim")).to_be_visible()
            expect(page.get_by_text("Mousse Cake")).to_be_visible()

            # Take a screenshot
            page.screenshot(path="verification/businesses_verification.png", full_page=True)
            print("Verification screenshot taken.")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="verification/error_screenshot.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_businesses()
