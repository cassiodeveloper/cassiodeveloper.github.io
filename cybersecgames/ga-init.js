window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-NL5R9VPGV9', { allow_google_signals: false, allow_ad_personalization_signals: false });
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href*="calendar.app.google"]');
  if (!a) return;
  gtag('event', 'book_click', {
    link_url: a.href,
    link_text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
    source_page: location.pathname
  });
});
