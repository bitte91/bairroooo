from playwright.sync_api import sync_playwright

def verify_home_and_navigation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()

        # Bypass onboarding by setting localStorage
        # We need to do this before page load or immediately after
        page = context.new_page()
        page.goto("http://localhost:3000/")

        # Inject localStorage
        page.evaluate("localStorage.setItem('cb_onboarding_done', 'true')")
        page.reload()
        page.wait_for_load_state("networkidle")

        # 1. Navigate to Home
        print("Navigating to home...")
        # Take screenshot of Home
        page.screenshot(path="verification/home.png", full_page=True)
        print("Home screenshot taken.")

        # 2. Click on "Comércio" (Navigation Test)
        # Assuming the link in the "Destaques" section or BottomNav (hidden on desktop usually)
        # But we added "Comércio" links in the "Destaques" section in Home.tsx
        print("Navigating to Comércio...")
        # There might be multiple links, let's pick one that is visible or specific
        # In Home.tsx, we have cards linking to /comercio
        page.get_by_role("link", name="Comércio").first.click()
        page.wait_for_url("**/comercio")
        page.wait_for_load_state("networkidle")

        # Take screenshot of Business View
        page.screenshot(path="verification/business.png", full_page=True)
        print("Business screenshot taken.")

        # 3. Click on "Serviços" (Navigation Test)
        # Need to go back home or find a way to navigate.
        # The Header usually doesn't have these links in desktop view in the original code?
        # Let's check BottomNav visibility. It's usually mobile only.
        # But I added links in Home.tsx.
        # Let's go back to home to find the Services link.
        page.goto("http://localhost:3000/")

        print("Navigating to Serviços...")
        page.get_by_role("link", name="Serviço").first.click()
        page.wait_for_url("**/servicos")
        page.wait_for_load_state("networkidle")

        # Take screenshot of Services View
        page.screenshot(path="verification/services.png", full_page=True)
        print("Services screenshot taken.")

        # 4. Check Mobile Bottom Nav (Resize viewport)
        page.set_viewport_size({"width": 375, "height": 667})
        page.goto("http://localhost:3000/")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/mobile_home.png", full_page=True)
        print("Mobile Home screenshot taken.")

        browser.close()

if __name__ == "__main__":
    try:
        verify_home_and_navigation()
        print("Verification script finished successfully.")
    except Exception as e:
        print(f"Verification script failed: {e}")
