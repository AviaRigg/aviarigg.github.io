// ══════════════════════════════════════════
//  AviaRigg — Availability Status
//  1 = active / visible
//  0 = hidden (work) or "Closed" (commissions)
// ══════════════════════════════════════════
const AVAILABLE_FOR_WORK        = 1;
const AVAILABLE_FOR_COMMISSIONS = 1;

// ── Run after DOM is ready ──
document.addEventListener('DOMContentLoaded', function () {

  // ── WORK STATUS ──
  if (AVAILABLE_FOR_WORK === 0) {
    // Nav badge — all pages
    document.querySelectorAll('.nav-badge').forEach(el => el.style.display = 'none');
    // Hero bar available item — home
    document.querySelectorAll('.hero-bar-item').forEach(el => {
      if (el.textContent.includes('Available for Work') || el.textContent.includes('Open to Work')) {
        el.style.display = 'none';
      }
    });
    // "Open to Work" chip — about
    document.querySelectorAll('.chip').forEach(el => {
      if (el.textContent.trim() === 'Open to Work') el.style.display = 'none';
    });
    // "Open to Opportunities" contact panel — contact
    const contactPanel = document.querySelector('.contact-panel');
    if (contactPanel) contactPanel.style.display = 'none';
    // Open to work note block — home
    const otwnBlock = document.querySelector('.open-to-work-note');
    if (otwnBlock) otwnBlock.style.display = 'none';
  }

  // ── COMMISSIONS STATUS ──
  if (AVAILABLE_FOR_COMMISSIONS === 0) {
    // Commissions tab label in shop
    document.querySelectorAll('.shop-tab').forEach(el => {
      if (el.textContent.includes('Commissions')) {
        el.innerHTML = el.innerHTML.replace('Commissions', 'Commissions <span style="font-size:8px;letter-spacing:1px;color:#ff6b6b;border:1px solid rgba(255,107,107,0.4);padding:1px 6px;margin-left:4px;vertical-align:middle;">Closed</span>');
      }
    });
    // Commission order buttons in shop commissions tab
    document.querySelectorAll('.comm-btn-primary, .comm-btn-outline').forEach(el => {
      if (el.href && el.href.includes('contact') || el.textContent.includes('Order') || el.textContent.includes('Commission')) {
        el.style.opacity = '0.4';
        el.style.pointerEvents = 'none';
        el.style.cursor = 'not-allowed';
      }
    });
    // Add a closed banner inside commissions tab panel if it exists
    const commTab = document.getElementById('tab-commissions');
    if (commTab) {
      const banner = document.createElement('div');
      banner.style.cssText = 'font-family:Share Tech Mono,monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#ff6b6b;border:1px solid rgba(255,107,107,0.3);background:rgba(255,107,107,0.06);padding:14px 20px;margin-bottom:32px;';
      banner.textContent = '// Commissions are currently closed — check back soon.';
      commTab.insertBefore(banner, commTab.firstChild);
    }
  }

});
