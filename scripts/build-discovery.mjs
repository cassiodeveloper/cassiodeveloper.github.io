import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { games, useCases } from '../cybersecgames/discovery-data.js';

// Progressive enhancement: useful catalog content is present before JavaScript.
const file = fileURLToPath(new URL('../cybersecgames/index.html', import.meta.url));
const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const catalog = games.map(game => {
  const cases = useCases.filter(item => item.gameIds.includes(game.id));
  return `<li><h3><a href="${escape(game.url)}">${escape(game.title)}</a></h3><p>${cases.map(item => escape(item.name.en)).join(' · ')}</p><p>${escape(cases[0].deliverable.en)}</p></li>`;
}).join('\n');
const section = `<section class="section discovery" id="discovery" aria-label="Games and services discovery"><div class="shell"><h2>Find the right game for your security challenge</h2><p>Explore cybersecurity games and proposed facilitated workshops for threat modeling, privacy, AI security, onboarding and incident response. Scope and deliverables are agreed for each engagement.</p><ul class="map-static-catalog">\n${catalog}\n</ul><p><a href="#contact">Discuss a facilitated workshop</a> or <a href="https://cybersecgames.com/collections/all-games">explore the official catalog</a>.</p><noscript><p>Enable JavaScript to combine filters and explore the interactive matrix.</p></noscript></div></section>`;
const html = fs.readFileSync(file, 'utf8');
const pattern = /<section class="section discovery"[\s\S]*?<\/section>/;
if (!pattern.test(html)) throw new Error('Discovery mount not found');
fs.writeFileSync(file, html.replace(pattern, section));
console.log(`Discovery HTML: ${games.length} games, ${useCases.length} proposed use cases`);
