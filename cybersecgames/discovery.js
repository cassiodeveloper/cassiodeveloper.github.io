import {games,useCases,scenarios,domains,processes,audiences,engagements,defaultState,readState,matchingCases} from './discovery-data.js';

const root=document.querySelector('#discovery');
const dialog=document.querySelector('#discovery-dialog');
let state=readState(location.search), openedGame='', openedCase='', returnFocus=null;
const pt=()=>document.documentElement.lang==='pt-BR';
const t=(en,br)=>pt()?br:en;
const label=value=>value[pt()?'pt-BR':'en'];
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(text,attrs='',kind='')=>`<button type="button" class="map-button ${kind}" ${attrs}>${text}</button>`;
const names=(ids,dict)=>ids.map(id=>label(dict[id])).join(' · ');
const select=(key,title,dict)=>`<label class="map-field"><span>${title}</span><select data-filter="${key}"><option value="">${t('All','Todos')}</option>${Object.entries(dict).map(([id,name])=>`<option value="${id}" ${state[key]===id?'selected':''}>${esc(typeof name==='string'?name:label(name))}</option>`).join('')}</select></label>`;
function track(name,extra={}) {
 const matches=matchingCases(state);
 const resultCount=new Set(matches.flatMap(u=>u.gameIds)).size;
 window.csgTrack?.(name,{mode:state.mode,view:state.view,game_id:state.game||'all',domain_id:state.domain||'all',process_id:state.process||'all',audience_id:state.audience||'all',engagement_id:state.engagement||'all',search_active:Boolean(state.q.trim()),result_count:resultCount,use_case_count:matches.length,...extra});
}
function update(patch,replace=false,trigger=null) {
 clearTimeout(searchTimer);
 // Results above these controls can lose several rows. Keep the interacted
 // section at the same viewport position instead of retaining an obsolete scrollY.
 const anchor=trigger?.closest('.map-stage, .map-engagements');
 const stageId=anchor?.dataset.stageId;
 const anchorTop=anchor?.getBoundingClientRect().top;
 const listScrolls=new Map(Array.from(root.querySelectorAll('.map-stage')).map(stage=>[stage.dataset.stageId,stage.querySelector('div').scrollTop]));
 const focused=trigger||document.activeElement;
 const focusAttribute=['data-remove','data-clear','data-stage','data-game','data-engagement'].find(key=>focused?.hasAttribute(key));
 const focusValue=focusAttribute?focused.getAttribute(focusAttribute):null;
 state={...state,...patch};const url=new URL(location.href);
 for(const [key,value] of Object.entries(state)) {if(value&&value!==defaultState[key])url.searchParams.set('map-'+key,value);else url.searchParams.delete('map-'+key);}
 if(url.href!==location.href)history[replace?'replaceState':'pushState']({},'',url);
 renderResults();syncControls();
 root.querySelectorAll('.map-stage').forEach(stage=>{stage.querySelector('div').scrollTop=listScrolls.get(stage.dataset.stageId)||0;});
 const restoredAnchor=stageId?root.querySelector(`[data-stage-id="${stageId}"]`):anchor;
 if(focusAttribute&&!focused.isConnected){const replacement=Array.from((restoredAnchor||root).querySelectorAll('['+focusAttribute+']')).find(el=>el.getAttribute(focusAttribute)===focusValue);(replacement||root.querySelector('[data-clear]')).focus({preventScroll:true});}
 if(restoredAnchor?.isConnected){
  const restorePosition=()=>{if(restoredAnchor.isConnected)window.scrollBy({top:restoredAnchor.getBoundingClientRect().top-anchorTop,behavior:'instant'});};
  restorePosition();
  // Reconcile the browser's own layout/scroll anchoring before the next paint.
  requestAnimationFrame(restorePosition);
 }
 const key=Object.keys(patch)[0];
 const source=trigger?.dataset.stage?'lifecycle_stage':trigger?.dataset.game?'lifecycle_game':trigger?.dataset.engagement?'engagement_cards':'filters';
 const name=Object.keys(patch).length>2?'csg_reset':key==='q'?'csg_search':key==='mode'?'csg_mode':key==='view'?'csg_view':'csg_filter';
 track(name,{source,filter_name:key,filter_value:key==='q'?(state.q.trim()?'active':'empty'):(state[key]||'all')});
}
function syncControls(){
 root.querySelectorAll('[data-filter]').forEach(el=>{el.value=state[el.dataset.filter];});
 root.querySelectorAll('[data-mode]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.mode===state.mode)));
 root.querySelectorAll('[data-view]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.view===state.view)));
 root.querySelector('#map-game-field').hidden=state.mode!=='game';
}
function render(){
 root.setAttribute('aria-label',t('Games and services discovery','Descoberta de jogos e serviços'));
 root.innerHTML=`<div class="shell">
 <header class="map-heading"><p class="eyebrow">${t('BEYOND THE GAME','ALÉM DO JOGO')}</p><h2>${t('Every game.<br>A real security outcome.','Cada jogo.<br>Uma aplicação real em segurança.')}</h2><p>${t('Find the right game for your security challenge. From onboarding to incident response, bring security knowledge into everyday practice.','Encontre o jogo certo para seu desafio de segurança. Da integração de pessoas à resposta a incidentes, transforme conhecimento em prática cotidiana.')}</p></header>
 <div class="map-toolbar" role="group" aria-label="${t('Explore by','Explorar por')}">${button(t('Explore by security challenge','Explorar por desafio'),'data-mode="challenge"')}${button(t('Explore by game','Explorar por jogo'),'data-mode="game"')}</div>
 <div class="map-filters"><label class="map-field map-search"><span>${t('Search games, services or outcomes','Buscar jogos, serviços ou resultados')}</span><input data-filter="q" type="search" maxlength="160" value="${esc(state.q)}" placeholder="${t('Try privacy, onboarding, AI…','Experimente privacidade, integração, IA…')}"></label>
 <div id="map-game-field">${select('game',t('Select your game','Selecione seu jogo'),Object.fromEntries(games.map(g=>[g.id,g.title])))}</div>
 ${select('domain',t('Security challenge','Desafio de segurança'),domains)}${select('process',t('Corporate process','Processo corporativo'),processes)}${select('audience',t('Audience','Público'),audiences)}${select('engagement',t('Engagement','Formato'),engagements)}</div>
 <div class="map-result-bar"><p id="map-count" role="status" aria-live="polite" aria-atomic="true"></p><div role="group" aria-label="${t('Result view','Visualização')}">${button(t('Cards','Cartões'),'data-view="cards"')}${button(t('Matrix','Matriz'),'data-view="matrix"')}</div>${button(t('Clear all filters','Limpar filtros'),'data-clear')}</div>
 <div id="map-chips" class="map-chips"></div><div id="map-results"></div>
 <section class="map-lifecycle" aria-labelledby="map-life-title"><p class="eyebrow">${t('FROM DAY ONE TO CONTINUOUS IMPROVEMENT','DO PRIMEIRO DIA À MELHORIA CONTÍNUA')}</p><h3 id="map-life-title">${t('Security games across the business lifecycle','Jogos de segurança no ciclo de vida da empresa')}</h3><p>${t('Choose a stage to filter. Choose a game to highlight every stage where it fits.','Selecione uma etapa para filtrar. Selecione um jogo para destacar todas as etapas em que ele se aplica.')}</p><div id="map-stages"></div></section>
 <section class="map-engagements"><h3>${t('Choose how you want to play','Escolha como você quer jogar')}</h3><div>${Object.entries(engagements).map(([id,value])=>button(esc(label(value)),`data-engagement="${id}"`)).join('')}</div><p class="map-note">${t('Proposed facilitated formats. Scope, duration and deliverables are agreed for each engagement. Learning activities do not constitute certification or a guarantee of compliance.','Formatos propostos de facilitação. Escopo, duração e entregáveis são acordados para cada contratação. Atividades educativas não constituem certificação nem garantia de conformidade.')}</p></section>
 <footer class="map-cta"><h3>${t('Your security challenge. Our games. Practical next steps.','Seu desafio de segurança. Jogos e próximos passos concretos.')}</h3><p>${t('Tell us what your team needs to improve. We will help you choose a game, workshop or ongoing program.','Conte o que sua equipe precisa melhorar. Vamos ajudar a escolher um jogo, workshop ou programa contínuo.')}</p><div class="button-row"><a class="button button-dark" href="https://cybersecgames.com/collections/all-games">${t('Explore all games','Explorar todos os jogos')}</a><a class="button button-ghost" href="#contact">${t('Discuss a corporate program','Conversar sobre um programa corporativo')}</a></div></footer></div>`;
 renderResults();syncControls();
}
function renderResults(){
 const matches=matchingCases(state);const visible=games.filter(g=>matches.some(u=>u.gameIds.includes(g.id)));
 root.querySelector('#map-count').textContent=t(`${visible.length} ${visible.length===1?'game':'games'} · ${matches.length} ${matches.length===1?'use case':'use cases'}`,`${visible.length} ${visible.length===1?'jogo':'jogos'} · ${matches.length} ${matches.length===1?'caso de uso':'casos de uso'}`);
 const dicts={game:Object.fromEntries(games.map(g=>[g.id,pairTitle(g.title)])),domain:domains,process:processes,audience:audiences,engagement:engagements};
 root.querySelector('#map-chips').innerHTML=Object.entries(state).filter(([key,value])=>value&&!['mode','view'].includes(key)).map(([key,value])=>button(`${esc(key==='q'?value:label(dicts[key][value]))} <span aria-hidden="true">×</span>`,`data-remove="${key}" aria-label="${esc(t('Remove filter: ','Remover filtro: ')+(key==='q'?value:label(dicts[key][value])))}"`)).join('');
 root.querySelector('#map-results').innerHTML=!visible.length?`<div class="map-empty"><h3>${t('No matching games yet','Nenhum jogo nesta combinação')}</h3><p>${t('Remove a filter or try a broader search.','Remova um filtro ou tente uma busca mais ampla.')}</p>${button(t('Reset discovery','Recomeçar a descoberta'),'data-clear')}</div>`:state.view==='matrix'?matrix(visible,matches):`<div class="map-cards">${visible.map(g=>card(g,matches.filter(u=>u.gameIds.includes(g.id)))).join('')}</div>`;
 const lifecycleCases=matchingCases({...state,process:''});
 root.querySelector('#map-stages').innerHTML=Object.entries(processes).map(([id,name],index)=>{
 const stageGames=games.filter(g=>lifecycleCases.some(u=>u.gameIds.includes(g.id)&&u.processes.includes(id)));
 return `<article data-stage-id="${id}" class="map-stage ${state.game&&stageGames.length?'is-highlighted':''}">${button(`<span class="map-step">0${index+1}</span>${esc(label(name))}`,`data-stage="${id}" aria-pressed="${state.process===id}"`)}<div>${stageGames.map(g=>button(esc(g.title),`data-game="${g.id}" aria-pressed="${state.game===g.id}"`)).join('')||`<small>${t('No matching games','Sem jogos correspondentes')}</small>`}</div></article>`;
 }).join('');
 root.querySelectorAll('[data-engagement]').forEach(el=>el.setAttribute('aria-pressed',String(state.engagement===el.dataset.engagement)));
 root.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.parentElement.querySelector('.map-image-fallback').hidden=false;},{once:true}));
}
function pairTitle(title){return {en:title,'pt-BR':title};}
function card(g,cases){const u=cases[0];return `<article class="map-card"><div class="map-product"><img src="${esc(g.image)}" width="640" height="480" loading="lazy" decoding="async" alt="${esc(g.title)}"><p class="map-image-fallback" hidden>${t('Product image unavailable. See the game in the official store.','Imagem indisponível. Veja o jogo na loja oficial.')}</p></div><div class="map-card-body"><p class="map-tags">${esc(names([...new Set(cases.flatMap(c=>c.domains))],domains))}</p><h3>${esc(g.title)}</h3><p class="map-note">${t('Proposed facilitated service','Proposta de serviço facilitado')}</p><p class="map-service">${esc(label(u.name))}</p><dl><dt>${t('Where it fits','Onde se aplica')}</dt><dd>${esc(names(u.processes,processes))}</dd><dt>${t('Audience','Público')}</dt><dd>${esc(names(u.audiences,audiences))}</dd><dt>${t('Potential deliverable','Entregável potencial')}</dt><dd>${esc(label(u.deliverable))}</dd></dl><p class="map-note">${g.availability==='backorder'?t('Backorder noted at verification. Confirm availability in store.','Reposição pendente na verificação. Confirme a disponibilidade na loja.'):t('Availability and editions: check the official store.','Disponibilidade e edições: consulte a loja oficial.')}</p><div class="map-card-actions">${button(t(`Explore ${cases.length} use cases`,`Explorar ${cases.length} casos de uso`),`data-open="${g.id}"`,'map-primary')}<a href="${esc(g.url)}">${t('View / buy the game ↗','Ver / comprar o jogo ↗')}</a>${button(t('Book a facilitated experience','Solicitar experiência facilitada'),`data-open="${g.id}"`)}${button(t('Bring this into my company','Levar à minha empresa'),`data-company="${g.id}"`)}</div></div></article>`;}
function matrix(visible,matches){return `<div class="map-matrix" role="region" tabindex="0" aria-label="${t('Game-to-process matrix, scroll horizontally','Matriz de jogos e processos, role horizontalmente')}"><table><caption>${t('Select a match to explore its use cases','Selecione uma correspondência para explorar seus casos de uso')}</caption><thead><tr><th scope="col">${t('Game','Jogo')}</th>${Object.values(processes).map(p=>`<th scope="col">${esc(label(p))}</th>`).join('')}</tr></thead><tbody>${visible.map(g=>`<tr><th scope="row">${esc(g.title)}</th>${Object.entries(processes).map(([id,p])=>{const cases=matches.filter(u=>u.gameIds.includes(g.id)&&u.processes.includes(id));return `<td>${cases.length?button(`${cases.length} <span aria-hidden="true">↗</span>`,`data-open="${g.id}" data-case="${cases[0].id}" title="${esc(cases.map(u=>label(u.name)).join(' · '))}" aria-label="${esc(g.title+' — '+label(p))}"`):'<span aria-label="'+t('No mapped application','Sem aplicação mapeada')+'">—</span>'}</td>`;}).join('')}</tr>`).join('')}</tbody></table></div>`;}
function openDetails(gameId,caseId,company=false){
 const wasOpen=dialog.open;
 const changingCase=dialog.open&&document.activeElement?.hasAttribute('data-case-select');
 openedGame=gameId;const g=games.find(g=>g.id===gameId);const cases=useCases.filter(u=>u.gameIds.includes(gameId));
 const current=cases.find(u=>u.id===caseId)||cases.find(u=>matchingCases(state).includes(u))||cases[0];openedCase=current.id;
 const educational=current.educational||current.engagements.includes('learn');
 dialog.innerHTML=`<div class="map-dialog-top">${button(t('Close ×','Fechar ×'),'data-close autofocus')}</div><p class="eyebrow">${t('PROPOSED FACILITATED EXPERIENCE','PROPOSTA DE EXPERIÊNCIA FACILITADA')}</p><h2 id="map-dialog-title">${esc(g.title)}</h2><label class="map-field"><span>${t('Choose a use case','Escolha um caso de uso')}</span><select data-case-select>${cases.map(u=>`<option value="${u.id}" ${u.id===current.id?'selected':''}>${esc(label(u.name))}</option>`).join('')}</select></label>
 <h3>${t('Business challenge','Desafio de negócio')}</h3><p>${esc(label(scenarios[g.id].challenge))} ${t('The session focuses on','A sessão tem como foco')} ${esc(label(current.name))}.</p>
 <h3>${t('Where it fits','Onde se aplica')}</h3><p>${esc(names(current.processes,processes))}</p>
 <h3>${t('How the experience works','Como funciona a experiência')}</h3><ol><li>${t('Agree the objective and select a relevant scenario.','Definir o objetivo e selecionar um cenário relevante.')}</li><li>${t('Introduce the game and guide a collaborative round.','Apresentar o jogo e orientar uma rodada colaborativa.')}</li><li>${esc(label(scenarios[g.id].activity))}</li><li>${t('Discuss priorities and prepare','Discutir prioridades e preparar')}: ${esc(label(current.deliverable))}.</li><li>${t('Agree owners and next steps for the selected process.','Combinar responsáveis e próximos passos para o processo selecionado.')}</li></ol>
 <h3>${t('Recommended audience','Público recomendado')}</h3><p>${esc(names(current.audiences,audiences))}</p><h3>${t('Potential deliverables','Entregáveis potenciais')}</h3><p>${esc(label(current.deliverable))}</p><p class="map-note">${educational?t('Educational outputs; practice scenarios do not constitute a formal assessment.','Resultados educativos; cenários de prática não constituem uma avaliação formal.'):t('Assessment outputs depend on the agreed scope and evidence supplied by the team.','Resultados de avaliação dependem do escopo acordado e das evidências fornecidas pela equipe.')}</p>
 <label class="map-field"><span>${t('Engagement model','Formato de contratação')}</span><select data-inquiry-model>${current.engagements.map(id=>`<option value="${id}" ${(company&&id==='embed')?'selected':''}>${esc(label(engagements[id]))}</option>`).join('')}</select></label><div class="map-card-actions">${button(t('Request this workshop','Solicitar este workshop'),'data-inquire','map-primary')}${button(t('Bring this into my company','Levar à minha empresa'),'data-inquire="embed"')}<a href="${esc(g.url)}">${t('Buy the game in the official store ↗','Comprar o jogo na loja oficial ↗')}</a></div><h3>${t('Explore related games','Explorar jogos complementares')}</h3><div class="map-related">${games.filter(other=>other.id!==g.id&&useCases.some(u=>u.gameIds.includes(other.id)&&u.domains.some(id=>current.domains.includes(id)))).map(other=>button(esc(other.title),`data-open="${other.id}"`)).join('')}</div>`;
 if(!dialog.open){returnFocus=document.activeElement;dialog.showModal();}else dialog.querySelector(changingCase?'[data-case-select]':'[data-close]').focus();
 track(wasOpen?'csg_case_change':'csg_case_open',{game_id:gameId,case_id:current.id,source:wasOpen?'detail':company?'company_cta':state.view});
}
function inquire(embed){
 const g=games.find(g=>g.id===openedGame),u=useCases.find(u=>u.id===openedCase);
 const model=embed?'embed':dialog.querySelector('[data-inquiry-model]').value;
 track('csg_inquiry',{game_id:g.id,case_id:u.id,engagement_id:model,action:'prefill_contact',source:'detail'});
 const message=[t('Game: ','Jogo: ')+g.title,t('Security domain: ','Domínio: ')+names(u.domains,domains),t('Use case / service: ','Caso de uso / serviço: ')+label(u.name),t('Engagement: ','Formato: ')+label(engagements[model]),t('Corporate processes: ','Processos: ')+names(u.processes,processes)].join('\n');
 const field=document.querySelector('[data-contact-form] [name="message"]');
 field.value=[field.value.trim(),message].filter(Boolean).join('\n\n');returnFocus=null;dialog.close();document.querySelector('#contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});field.focus({preventScroll:true});
}
root.addEventListener('click',event=>{
 const el=event.target.closest('button');if(!el)return;
 if(el.hasAttribute('data-clear'))update({...defaultState,mode:state.mode,view:state.view});
 else if(el.dataset.mode)update({mode:el.dataset.mode});
 else if(el.dataset.view)update({view:el.dataset.view});
 else if(el.dataset.remove)update({[el.dataset.remove]:''});
 else if(el.dataset.stage)update({process:state.process===el.dataset.stage?'':el.dataset.stage},false,el);
 else if(el.dataset.game)update({game:state.game===el.dataset.game?'':el.dataset.game,mode:'game'},false,el);
 else if(el.dataset.engagement)update({engagement:state.engagement===el.dataset.engagement?'':el.dataset.engagement},false,el);
 else if(el.dataset.open)openDetails(el.dataset.open,el.dataset.case);
 else if(el.dataset.company)openDetails(el.dataset.company,null,true);
});
root.addEventListener('change',event=>{if(event.target.matches('select[data-filter]'))update({[event.target.dataset.filter]:event.target.value});});
let searchTimer;
root.addEventListener('input',event=>{if(event.target.dataset.filter==='q'){clearTimeout(searchTimer);const value=event.target.value;state.q=value;searchTimer=setTimeout(()=>update({q:value}),180);}});
dialog.addEventListener('click',event=>{const el=event.target.closest('button');if(!el)return;if(el.hasAttribute('data-close'))dialog.close();else if(el.dataset.open)openDetails(el.dataset.open);else if(el.hasAttribute('data-inquire'))inquire(el.dataset.inquire==='embed');});
dialog.addEventListener('change',event=>{if(event.target.hasAttribute('data-case-select'))openDetails(openedGame,event.target.value);else if(event.target.hasAttribute('data-inquiry-model'))track('csg_engagement',{game_id:openedGame,case_id:openedCase,engagement_id:event.target.value,source:'detail'});});
dialog.addEventListener('close',()=>{track('csg_case_close',{game_id:openedGame,case_id:openedCase});if(returnFocus?.isConnected)returnFocus.focus();});
function trackProductClick(event){const link=event.target.closest('a[href]');const game=link&&games.find(g=>g.url===link.href);if(game)track('csg_game_click',{game_id:game.id,source:event.currentTarget===dialog?'detail':'cards',...(event.currentTarget===dialog?{case_id:openedCase}:{})});}
root.addEventListener('click',trackProductClick);
dialog.addEventListener('click',trackProductClick);
window.addEventListener('popstate',()=>{clearTimeout(searchTimer);state=readState(location.search);if(dialog.open)dialog.close();render();track('csg_history',{source:'browser'});});
new MutationObserver(()=>{render();if(dialog.open)openDetails(openedGame,openedCase);}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
render();
