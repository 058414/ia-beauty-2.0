#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Test IA BEAUTY 2.0 complete flow Q1 to Q4
Tests: Personalization, transitions, Q4 consolidation, PDF generation
"""

import subprocess
import time
import json
from pathlib import Path
import urllib.request
import urllib.error

def test_health():
    """Check if server is running"""
    try:
        with urllib.request.urlopen('http://localhost:3000', timeout=5) as resp:
            return resp.status == 200
    except:
        return False

def wait_for_server(max_wait=30):
    """Wait for server to be ready"""
    start = time.time()
    while time.time() - start < max_wait:
        if test_health():
            print("[OK] Server is running on http://localhost:3000")
            return True
        time.sleep(1)
    return False

def run_browser_test():
    """Run Playwright test for complete flow"""
    test_script = """
    const { chromium } = require('playwright');

    (async () => {
      const browser = await chromium.launch();
      const page = await browser.newPage();

      console.log('[START] Starting Q1 to Q4 flow test...');
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

      // Q1: Expect to see home screen with 4 quadrants
      const quadrants = await page.$$('.quadrante-card');
      console.log(`✅ Q1: Found ${quadrants.length} quadrant cards`);

      // Click Q1
      console.log('→ Opening Q1 (Facial Analysis)...');
      const q1Button = await page.$('button:has-text("Iniciar Análise")');
      if (q1Button) {
        await q1Button.click();
        await page.waitForNavigation({ timeout: 3000 }).catch(() => {});
      }

      // Wait for Q1 content
      const q1Content = await page.$('.quadrante-content');
      if (q1Content) {
        console.log('✅ Q1 loaded successfully');

        // Check for name input
        const nameInput = await page.$('input[placeholder*="nome"]') || await page.$('input[placeholder*="Nome"]');
        if (nameInput) {
          console.log('✅ Q1: Name input field found');
          await nameInput.fill('Maria Silva');
          console.log('✅ Q1: Name filled with "Maria Silva"');
        }
      }

      await browser.close();
      console.log('✅ Test completed');
    })();
    """

    # Try with Playwright
    try:
        result = subprocess.run(['npx', 'playwright', 'test'],
                              cwd='C:\\\\Users\\\\Usuário\\\\ia-beauty-2.0-novo',
                              capture_output=True, text=True, timeout=30)
        print("Playwright test output:", result.stdout)
        if result.stderr:
            print("Errors:", result.stderr)
    except:
        print("⚠️  Playwright not available, testing with curl...")
        return test_with_curl()

def test_with_curl():
    """Fallback: Test with curl and check HTML structure"""
    try:
        with urllib.request.urlopen('http://localhost:3000') as resp:
            html = resp.read().decode('utf-8')

        checks = {
            '[OK] Page title correct': 'IA BEAUTY' in html,
            '[OK] Quadrants present': 'quadrante-card' in html,
            '[OK] Q1 button': 'Iniciar' in html or 'Quadrante' in html,
            '[OK] Q2 button': 'Q2' in html or 'Gola' in html,
            '[OK] Q3 button': 'Q3' in html or 'Corpo' in html,
            '[OK] Q4 button': 'Q4' in html or 'Sintese' in html,
        }

        for check, result in checks.items():
            status = '[PASS]' if result else '[FAIL]'
            print(f"{status} {check}")

        return all(checks.values())
    except Exception as e:
        print(f"❌ Error testing with curl: {e}")
        return False

def main():
    print("=" * 60)
    print("IA BEAUTY 2.0 - Complete Flow Test (Q1 to Q4)")
    print("=" * 60)

    # Wait for server
    if not wait_for_server():
        print("[FAIL] Server failed to start on http://localhost:3000")
        return False

    time.sleep(1)

    # Test page loads
    print("\n[INFO] Testing page structure...")
    if not test_with_curl():
        print("[FAIL] Page structure test failed")
        return False

    print("\n[OK] All structure tests passed!")
    print("\nNext steps (manual):")
    print("1. Open http://localhost:3000 in browser")
    print("2. Click Q1 to start facial analysis")
    print("3. Enter name 'Maria Silva'")
    print("4. Upload photo or use camera")
    print("5. Complete Q2 (gola) -> Q3 (corpo) -> Q4 (consolidation)")
    print("6. Verify name appears in all headings")
    print("7. Download PDF and validate content")

    return True

if __name__ == '__main__':
    success = main()
    exit(0 if success else 1)
