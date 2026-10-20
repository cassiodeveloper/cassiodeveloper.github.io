import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(process.argv[2] || fileURLToPath(new URL('..', import.meta.url)));
const services = [
 ['AppSec Nightmare', 'AppSec Nightmare', 'https://cassiodeveloper.com.br/appsec-nightmare/'],
 ['YASS — Assessment AppSec', 'YASS — AppSec Assessment', 'https://cassiodeveloper.com.br/yass'],
 ['Software de Ferro — Treinamento', 'Software de Ferro — Training', 'https://cassiodeveloper.com.br/IronSoftware'],
 ['AppSec On Fire', 'AppSec On Fire', 'https://cassiodeveloper.com.br/AppSec-On-Fire/'],
 ['CyberSec Games — Workshops', 'CyberSec Games — Workshops', 'https://cassiodeveloper.com.br/cybersecgames/']
];
function walk(dir) {
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name.startsWith('.')||['node_modules','c'].includes(e.name)?[]:e.isDirectory()?walk(path.join(dir,e.name)):e.name.endsWith('.html')?[path.join(dir,e.name)]:[]);
}
let count=0;
for (const file of walk(root)) {
 let html=fs.readFileSync(file,'utf8').replace(/<!-- services-menu:start -->[\s\S]*?<!-- services-menu:end -->/g,'').replace(/<!-- services-assets:start -->[\s\S]*?<!-- services-assets:end -->/g,'');
 const en=/<html[^>]*lang="en(?:-[^"]*)?"/.test(html);
 const links=services.map(([pt,english,url])=>`<a href="${url}${url.includes('/cybersecgames/')?'?lang='+ (en?'en':'pt-BR'):''}" data-service-pt="${pt}" data-service-en="${english}">${en?english:pt}</a>`).join('');
 const menu=`<details class="services-menu"><summary><span data-service-pt="Serviços" data-service-en="Services">${en?'Services':'Serviços'}</span></summary><div class="services-panel">${links}</div></details>`;
 let matched=false;
 html=html.replace(/(<ul class="s-header__menu-links">)|(<nav\b[^>]*(?:class="(?:primary-nav|c-nav|links)"|aria-label="(?:Primary navigation|Navegação principal)")[^>]*>)/,(opening,list)=>{matched=true;return opening+'<!-- services-menu:start -->'+(list?'<li class="services-item">'+menu+'</li>':menu)+'<!-- services-menu:end -->';});
 if(!matched)continue;
 const prefix=path.relative(path.dirname(file),path.join(root,'assets')).split(path.sep).join('/');
 html=html.replace('</head>',`<!-- services-assets:start --><link rel="stylesheet" href="${prefix}/services-menu.css"><script src="${prefix}/services-menu.js" defer></script><!-- services-assets:end --></head>`);
 if(html!==fs.readFileSync(file,'utf8'))fs.writeFileSync(file,html);
 count++;
}
console.log(`Services menu: ${count} pages in ${root}`);
