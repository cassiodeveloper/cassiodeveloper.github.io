window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
// Keep free-text filter queries and URL fragments out of analytics payloads.
function csgCleanUrl(value) {
  try { var url = new URL(value); return url.origin + url.pathname; } catch (_) { return ''; }
}
var csgPageUrl = csgCleanUrl(location.href);
var csgReferrer = csgCleanUrl(document.referrer);
gtag('set', { page_location: csgPageUrl, page_referrer: csgReferrer });
// Local previews queue events for inspection without configuring production GA.
if (['cassiodeveloper.com.br', 'www.cassiodeveloper.com.br'].includes(location.hostname)) {
  gtag('config', 'G-NL5R9VPGV9', { page_location: csgPageUrl, page_referrer: csgReferrer, allow_google_signals: false, allow_ad_personalization_signals: false });
}
var csgEvents = new Set(['csg_filter', 'csg_search', 'csg_mode', 'csg_view', 'csg_reset', 'csg_history', 'csg_case_open', 'csg_case_change', 'csg_case_close', 'csg_engagement', 'csg_inquiry', 'csg_game_click', 'csg_navigation', 'csg_section_view', 'csg_language']);
var csgFields = new Set(['action', 'source', 'mode', 'view', 'game_id', 'case_id', 'domain_id', 'process_id', 'audience_id', 'engagement_id', 'filter_name', 'filter_value', 'result_count', 'use_case_count', 'search_active', 'section_id']);
window.csgTrack = function (name, values) {
  if (!csgEvents.has(name)) return;
  var params = { source_page: location.pathname, page_location: csgPageUrl, page_referrer: csgReferrer, language: document.documentElement.lang === 'pt-BR' ? 'pt-BR' : 'en' };
  Object.entries(values || {}).forEach(function (entry) {
    var key = entry[0], value = entry[1];
    if (!csgFields.has(key)) return;
    if (typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value))) params[key] = value;
    else if (typeof value === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(value)) params[key] = value;
  });
  try { gtag('event', name, params); } catch (_) { /* Analytics must never block interaction. */ }
};
document.addEventListener('click', function (e) {
  var link = e.target.closest && e.target.closest('a[href]');
  if (link) {
    var destination = new URL(link.href, location.href);
    if (destination.origin === location.origin && destination.pathname === location.pathname && destination.hash && document.getElementById(destination.hash.slice(1))) {
      window.csgTrack('csg_navigation', { section_id: destination.hash.slice(1), source: link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'content' });
    }
  }
  var languageButton = e.target.closest && e.target.closest('[data-language]');
  if (languageButton) window.csgTrack('csg_language', { filter_value: languageButton.dataset.language });
  var a = e.target.closest && e.target.closest('a[href*="calendar.app.google"]');
  if (!a) return;
  gtag('event', 'book_click', {
    link_url: a.href,
    link_text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
    source_page: location.pathname
  });
});
document.addEventListener('DOMContentLoaded', function () {
  if (!('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var section = entry.target;
      window.csgTrack('csg_section_view', { section_id: section.id });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.01 });
  document.querySelectorAll('main section[id]').forEach(function (section) {
    observer.observe(section);
  });
});
