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
        # "Conecta Bairro" text is hidden on mobile, look for the welcome message
        page.wait_for_selector('text="Olá, Vizinho!"')
        time.sleep(1)
        page.screenshot(path="verification/01_home.png")
        print("Home screenshot taken.")

        # 2. Services
        print("Navigating to Services...")
        page.goto(f"{base_url}/servicos")
        page.wait_for_selector('text="Mercadinho da Esquina"')
        page.screenshot(path="verification/02_services.png")
        print("Services screenshot taken.")

        # 3. Events
        print("Navigating to Events...")
        page.goto(f"{base_url}/eventos")
        page.wait_for_selector('text="Eventos no Bairro"')
        page.screenshot(path="verification/03_events.png")
        print("Events screenshot taken.")

        # 4. Safety
        print("Navigating to Safety...")
        page.goto(f"{base_url}/seguranca")
        page.wait_for_selector('text="Botão de Pânico"')
        page.screenshot(path="verification/04_safety.png")
        print("Safety screenshot taken.")

        # 5. Profile
        print("Navigating to Profile...")
        page.goto(f"{base_url}/perfil")
        # Check for guest view text
        page.wait_for_selector('text="Entre na sua conta"')
        page.screenshot(path="verification/05_profile_guest.png")
        print("Profile (Guest) screenshot taken.")

        # 6. Chat
        print("Navigating to Chat...")
        page.goto(f"{base_url}/chat")
        page.wait_for_selector('text="Mensagens"')
        page.screenshot(path="verification/06_chat_empty.png")
        print("Chat screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_app()
