from playwright.sync_api import sync_playwright

def verify_input_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            print("Navigating to http://localhost:3001/test-input")
            page.goto("http://localhost:3001/test-input", timeout=30000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            return

        page.wait_for_selector("input", state="visible")

        inputs = page.locator("input")
        labels = page.locator("label")

        print(f"Found {inputs.count()} inputs and {labels.count()} labels")

        if labels.count() > 0:
            count = labels.count()
            for i in range(count):
                label = labels.nth(i)
                for_attr = label.get_attribute("for")
                text = label.text_content()
                print(f"Label '{text}' for attribute: {for_attr}")

                if for_attr:
                    # Escape chars for CSS selector if needed
                    selector = f"[id='{for_attr}']"
                    associated_input = page.locator(selector)
                    if associated_input.count() > 0:
                         print(f"SUCCESS: Label '{text}' is correctly associated with an input via ID '{for_attr}'")
                    else:
                         print(f"FAILURE: Label '{text}' has 'for' attribute '{for_attr}' but no matching input found")
                else:
                     print(f"FAILURE: Label '{text}' missing 'for' attribute")

        page.screenshot(path="verification/input_verification.png")
        browser.close()

if __name__ == "__main__":
    verify_input_accessibility()
