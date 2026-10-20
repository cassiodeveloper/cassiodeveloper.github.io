(() => {
 const menus = [...document.querySelectorAll('.services-menu')];
 function translate() {
  const en = document.documentElement.lang.toLowerCase().startsWith('en');
  menus.forEach(menu => {
   menu.querySelectorAll('[data-service-pt]').forEach(el => { el.textContent = en ? el.dataset.serviceEn : el.dataset.servicePt; });
   const games = menu.querySelector('a[href*="/cybersecgames/"]');
   if (games) games.href = 'https://cassiodeveloper.com.br/cybersecgames/?lang=' + (en ? 'en' : 'pt-BR');
  });
 }
 translate();
 new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 document.addEventListener('click', event => menus.forEach(menu => {
  if (!menu.contains(event.target) || event.target.closest('a')) menu.open = false;
 }));
 document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  menus.forEach(menu => { if(menu.open) { menu.open=false; menu.querySelector('summary').focus(); } });
 });
})();
