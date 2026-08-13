(function(){
  var root=document.documentElement;
  function apply(){var pt=(root.getAttribute('lang')||'').toLowerCase().indexOf('pt')===0;
    document.querySelectorAll('.ladder-next [data-pt][data-en]').forEach(function(el){el.textContent=pt?el.getAttribute('data-pt'):el.getAttribute('data-en');});}
  apply();
  try{new MutationObserver(apply).observe(root,{attributes:true,attributeFilter:['lang']});}catch(e){}
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('.ladder-next__card');if(!a||!window.gtag)return;
    gtag('event','ladder_click',{from_step:a.getAttribute('data-ladder-from'),to_step:a.getAttribute('data-ladder-to'),link_url:a.href,source_page:location.pathname});});
})();
