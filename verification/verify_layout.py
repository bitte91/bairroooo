from playwright.sync_api import sync_playwright
import time

def verify_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate a mobile device (iPhone 12 Pro)
        iphone_12 = p.devices['iPhone 12 Pro']
        context = browser.new_context(**iphone_12)
        page = context.new_page()

        # 1. Verify Home Page
        print("Navigating to Home...")
        page.goto("http://localhost:3001")
        page.wait_for_load_state("networkidle")
        page.wait_for_selector("text=Bem-vindo à Conecta Vila")
        page.screenshot(path="verification/01_home.png")
        print("Home screenshot taken.")

        # 2. Verify News Page
        print("Navigating to News...")
        # Click the link in Bottom Nav (it's an anchor, dashboard is a button)
        # We can select by href to be safe
        page.locator("a[href='/noticias']").click()
        page.wait_for_load_state("networkidle")
        page.wait_for_selector("text=Notícias do Bairro")
        page.screenshot(path="verification/02_news.png")
        print("News screenshot taken.")

        # 3. Verify Events Page
        print("Navigating to Events...")
        page.locator("a[href='/eventos']").click()
        page.wait_for_load_state("networkidle")
        page.wait_for_selector("text=Agenda da Vila")
        page.screenshot(path="verification/03_events.png")
        print("Events screenshot taken.")

        # 4. Verify Profile Page
        print("Navigating to Profile...")
        page.locator("a[href='/perfil']").click()
        page.wait_for_load_state("networkidle")
        page.wait_for_selector("text=Perfil do Usuário")
        page.screenshot(path="verification/04_profile.png")
        print("Profile screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_layout()
