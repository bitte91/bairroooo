from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Go to home page
            page.goto("http://localhost:3001/")

            # Wait for content to load
            page.wait_for_selector("text=Mapa do Bairro", timeout=10000)

            # Scroll down to see map and neighborhood list
            # We want to see "Bairros Atendidos" as well
            page.wait_for_selector("text=Bairros Atendidos", timeout=10000)

            # Scroll to map
            map_element = page.get_by_text("Mapa do Bairro")
            map_element.scroll_into_view_if_needed()

            # Wait for tiles to load (optional, but good for screenshot)
            page.wait_for_timeout(2000)

            # Take screenshot of the map and list area
            page.screenshot(path="verification/home_map_list.png", full_page=True)

            print("Screenshot taken successfully")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
