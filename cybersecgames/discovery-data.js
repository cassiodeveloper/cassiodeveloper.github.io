// Product names, links and images verified against the official catalog, 2026-10-19.
// Service mappings are editorial proposals, not official product descriptions.
const pair = (en, pt) => ({ en, 'pt-BR': pt });
export const domains = Object.fromEntries([
  ['awareness','Security Awareness & Onboarding','Conscientização e integração'],
  ['threat','Threat Modeling','Modelagem de ameaças'],
  ['development','Secure Software Development','Desenvolvimento seguro'],
  ['architecture','Security Architecture','Arquitetura de segurança'],
  ['cloud','Cloud & DevSecOps','Cloud e DevSecOps'],
  ['ai','AI Security & Governance','Segurança e governança de IA'],
  ['privacy','Privacy & Data Protection','Privacidade e proteção de dados'],
  ['response','Incident Response','Resposta a incidentes'],
  ['insider','Insider Threat','Ameaças internas'],
  ['champions','Security Champions & Team Development','Security Champions e desenvolvimento de equipes']
].map(([id,en,pt])=>[id,pair(en,pt)]));
export const processes = Object.fromEntries([
  ['join','Join & Learn','Integrar e aprender'],['plan','Discover & Plan','Descobrir e planejar'],
  ['design','Design & Architect','Projetar e arquitetar'],['build','Develop & Build','Desenvolver e construir'],
  ['govern','Govern & Assess','Governar e avaliar'],['operate','Operate & Monitor','Operar e monitorar'],
  ['respond','Detect & Respond','Detectar e responder'],['improve','Improve & Evolve','Melhorar e evoluir']
].map(([id,en,pt])=>[id,pair(en,pt)]));
export const audiences = Object.fromEntries([
 ['engineering','Engineering & Architecture','Engenharia e arquitetura'],['security','Security & Champions','Segurança e Champions'],
 ['product','Product & UX','Produto e UX'],['governance','Leadership, Privacy & Compliance','Liderança, privacidade e compliance'],
 ['operations','SOC, IT & Operations','SOC, TI e operações'],['everyone','Employees & New Joiners','Colaboradores e novos integrantes']
].map(([id,en,pt])=>[id,pair(en,pt)]));
export const engagements = {
 learn:pair('LEARN · Guided foundations','APRENDER · Fundamentos com orientação'),
 practice:pair('PRACTICE · Rehearse security processes','PRATICAR · Exercitar processos de segurança'),
 assess:pair('ASSESS · Explore risks and gaps','AVALIAR · Explorar riscos e lacunas'),
 embed:pair('EMBED · Integrate into everyday work','INCORPORAR · Integrar ao trabalho cotidiano')
};
// Stable IDs; each service can be associated with multiple games through useCases.gameIds.
const rows = [
 ['eop','Elevation of Privilege (EoP) Threat Modeling Card Game for Developers','elevation-of-privilege-game','EOP-Image-02-01_f5f782a8-3c6a-4005-888c-f08be27e1d8b.png?v=1742057062','threat architecture development champions','join design build improve','engineering security','Threat Modeling Onboarding|Facilitated Threat Modeling Workshop|Threat Modeling Process Enablement','Integração em modelagem de ameaças|Workshop de modelagem de ameaças|Implantação do processo de modelagem de ameaças','Threat model, risk register and mitigation backlog','Modelo de ameaças, registro de riscos e backlog de mitigação'],
 ['eop-privacy','Elevation of Privilege Threat Modeling with Privacy','elevation-of-privilege-with-privacy-suit','EOPP-Image-01.png?v=1742068291','threat privacy architecture','plan design govern','engineering product governance','Secure & Private by Design Workshop|Combined Security and Privacy Assessment','Workshop de segurança e privacidade desde a concepção|Avaliação conjunta de segurança e privacidade','Security and privacy threats, design recommendations','Ameaças de segurança e privacidade e recomendações de projeto'],
 ['architects','Security Architects - A fast paced threat modeling game','security-architects-a-fast-paced-threat-modeling-game','Render_Mockup_4000_3000_2026-05-13.png?v=1778615532','architecture threat champions','join design improve','engineering security','Secure Engineering Bootcamp|Security Architecture Decision-Making Workshop','Bootcamp de engenharia segura|Workshop de decisões de arquitetura de segurança','Team learning summary and architecture discussion findings','Resumo de aprendizagem e conclusões sobre arquitetura'],
 ['cornucopia-web','OWASP® Cornucopia 3.0 Website App Edition - Threat Modeling Cards','owasp%C2%AE-cornucopia-3-0-website-app-edition-threat-modeling-cards-copy','Untitled_design_69.png?v=1778410039','development threat architecture','plan design build join','engineering product security','Secure Feature Refinement|Security Requirements Workshop','Refinamento seguro de funcionalidades|Workshop de requisitos de segurança','Abuse scenarios, security requirements and acceptance criteria','Cenários de abuso, requisitos de segurança e critérios de aceitação'],
 ['cornucopia-mobile','OWASP® Cornucopia 2.0 Mobile App Edition - Threat Modeling Cards','owasp-cornucopia-mobile-app-edition-threat-modeling-cards','Untitleddesign_8.png?v=1789036220','development threat architecture','design build join','engineering security','Mobile App Security Design Review|Mobile Security Requirements Workshop','Revisão de projeto seguro para aplicativos móveis|Workshop de requisitos de segurança mobile','Mobile threat scenarios and mitigation recommendations','Cenários de ameaças mobile e recomendações de mitigação'],
 ['cornucopia-companion','OWASP Cornucopia Web App Companion Set - 25ᵗʰ Anniversary Edition','owasp-cornucopia-web-app-with-companion-edition','Render_Mockup_4000_3000_2026-05-11_4.png?v=1778490566','development cloud ai threat','design build govern','engineering security','Modern Application Security Review|Cross-Domain Threat Modeling Workshop','Revisão de segurança de aplicações modernas|Workshop de modelagem de ameaças entre domínios','Cross-domain threats and prioritized remediation proposals','Ameaças entre domínios e propostas priorizadas de correção'],
 ['cumulus','OWASP Cumulus for Cloud architectures & DevOps processes','owasp-cumulus-threat-modeling-the-clouds','Cumulus_-_Newlook_3.png?v=1791183816','cloud architecture threat','join design build operate','engineering security operations','Cloud Threat Modeling Workshop|DevSecOps Architecture Review','Workshop de modelagem de ameaças em cloud|Revisão de arquitetura DevSecOps','Cloud and pipeline risk map and improvement backlog','Mapa de riscos de cloud e pipelines e backlog de melhorias'],
 ['plot4ai','PLOT4ai: Practical Library Of Threats 4 Artificial Intelligence','plot4ai-a-threat-modeling-library-to-build-responsible-ai','GroupPic-PLOT4AI.png?v=1749463163','ai threat','plan design govern','engineering security product governance','AI Risk Discovery Workshop|Responsible AI Risk Assessment','Workshop de descoberta de riscos de IA|Avaliação de riscos de IA responsável','AI risk register, ownership and control recommendations','Registro de riscos de IA e recomendações de responsáveis e controles'],
 ['ml-security','Elevation of Machine Learning Security threat modeling Game','elevation-of-machine-learning-security-card-game','MLSEC-CARDS-01.png?v=1742111626','ai threat architecture','join design build govern','engineering security','ML Security Threat Modeling|AI/ML Security Architecture Review','Modelagem de ameaças de machine learning|Revisão de arquitetura de segurança de IA/ML','ML lifecycle threat model and mitigation backlog','Modelo de ameaças do ciclo de ML e backlog de mitigação'],
 ['fuzznet','FuzzNet Labs - Building a Machine Learning Model','fuzznet-labs','FuzzNet-OnlyCover.png?v=1756717010','ai champions','join build improve','engineering security product','AI Engineering Foundations|AI Literacy for Security Teams','Fundamentos de engenharia de IA|Letramento em IA para equipes de segurança','Learning summary and recommended next learning actions','Resumo de aprendizagem e próximos passos de capacitação'],
 ['ai-ethics',"Let's Talk AI Ethics by Sandy McVey",'lets-talk-ai-ethics-by-sandy-mcvey','Picture12.png?v=1750427707','ai','plan govern improve','product governance engineering','Responsible AI Decision Workshop|AI Policy Discovery Session','Workshop de decisões de IA responsável|Sessão de descoberta de políticas de IA','Responsible AI principles and draft governance recommendations','Princípios de IA responsável e propostas de governança'],
 ['linddun','LINDDUN GO Privacy Threat Modeling Cards','linddun-go-privacy-threat-modeling-cards','LINDDUN-Image-01.png?v=1742078304','privacy threat','plan design govern','governance engineering product','Privacy Threat Modeling Workshop|Privacy by Design Assessment','Workshop de modelagem de ameaças de privacidade|Avaliação de privacidade desde a concepção','Privacy threat model and risk treatment recommendations','Modelo de ameaças de privacidade e recomendações de tratamento'],
 ['context-cringe','Context & Cringe Application Privacy Game','context-cringe','Render_Mockup_4000_3000_2026-03-10-box.png?v=1773147793','privacy awareness','join plan design','product governance engineering','Privacy Product Design Workshop|Privacy Awareness Experience','Workshop de privacidade no design de produtos|Experiência de conscientização em privacidade','Data collection review questions and product privacy proposals','Questões para revisar a coleta de dados e propostas de privacidade'],
 ['backdoors','Backdoors & Breaches: Core Deck','backdoors-breaches-core-deck','Untitled_design_75.png?v=1783629227','response','join operate respond improve','security operations','Incident Response Game Day|Incident Response Readiness Assessment','Dia de prática de resposta a incidentes|Avaliação de preparação para incidentes','After-action report, process gaps and playbook recommendations','Relatório pós-exercício, lacunas e recomendações de playbooks'],
 ['insider','Insider Threat Kill Chain Card game','insider-threat-kill-chain-card-game','Render_Mockup_1600_1200_2026-03-31.png?v=1774898554','insider response','govern operate respond improve','security operations governance','Insider Threat Readiness Exercise|Insider Risk Tabletop Workshop','Exercício de preparação para ameaças internas|Workshop de simulação de riscos internos','Insider risk scenarios, control gaps and response recommendations','Cenários de risco interno, lacunas de controles e recomendações de resposta'],
 ['phishing','Clashing - Phishing Edition','clashing-phishing-edition','Clashing-box-with-cards-4_99c23b94-eb94-46d0-addf-2ec51b20ebf7.png?v=1746426611','awareness','join improve','everyone security','Phishing Reinforcement Session|Human Risk Awareness Workshop','Sessão de reforço contra phishing|Workshop de conscientização sobre risco humano','Recognition exercises and learning reinforcement recommendations','Exercícios de reconhecimento e recomendações de reforço da aprendizagem'],
 ['byte-club','Byte Club Cybersecurity Awareness Card Game','byte-club-card-game-to-hack-or-not-to-hack','BYTE-CLUB-CARDS-01.png?v=1742113692','awareness champions','join improve','everyone security','Cybersecurity Onboarding Experience|Cybersecurity Fundamentals Workshop','Experiência de integração em cibersegurança|Workshop de fundamentos de cibersegurança','Attack and defense learning summary and reinforcement actions','Resumo de aprendizagem sobre ataque e defesa e ações de reforço']
];
export const games = rows.map(r=>({id:r[0],title:r[1],url:'https://cybersecgames.com/collections/all-games/products/'+r[2],image:'https://cybersecgames.com/cdn/shop/files/'+r[3]+'&width=640',verifiedAt:'2026-10-19',availability:r[0]==='byte-club'?'backorder':'check-store'}));
export const scenarios = Object.fromEntries([
 ['eop','Engineering teams need a repeatable way to identify threats before implementation.','Equipes de engenharia precisam identificar ameaças de forma consistente antes da implementação.','Use a system diagram and STRIDE prompts to identify threats and discuss mitigations.','Usar um diagrama de sistema e as categorias STRIDE para identificar ameaças e discutir mitigações.'],
 ['eop-privacy','New features need security and personal-data risks considered together.','Novas funcionalidades precisam considerar riscos de segurança e dados pessoais em conjunto.','Review a feature and its data flows through security and privacy prompts.','Revisar uma funcionalidade e seus fluxos de dados com perguntas de segurança e privacidade.'],
 ['architects','Developers and champions need practice explaining secure architecture decisions.','Pessoas desenvolvedoras e champions precisam praticar a justificativa de decisões de arquitetura segura.','Discuss architecture choices and record the trade-offs surfaced during play.','Discutir escolhas de arquitetura e registrar os compromissos identificados durante o jogo.'],
 ['cornucopia-web','Product teams need actionable security requirements before a feature enters development.','Equipes de produto precisam de requisitos de segurança acionáveis antes do desenvolvimento.','Explore abuse scenarios for a web feature and turn them into acceptance criteria.','Explorar cenários de abuso de uma funcionalidade web e convertê-los em critérios de aceitação.'],
 ['cornucopia-mobile','Mobile teams need to discuss threats while application design can still change.','Equipes mobile precisam discutir ameaças enquanto o projeto ainda pode mudar.','Review mobile user journeys, data handling and security requirements.','Revisar jornadas mobile, tratamento de dados e requisitos de segurança.'],
 ['cornucopia-companion','Modern applications span technologies whose risks can fall between team boundaries.','Aplicações modernas combinam tecnologias cujos riscos podem ficar entre responsabilidades de equipes.','Compare threats across the selected architecture and agree which teams should investigate.','Comparar ameaças na arquitetura selecionada e combinar quais equipes devem investigá-las.'],
 ['cumulus','Cloud platforms and delivery pipelines need shared security review.','Plataformas cloud e pipelines de entrega precisam de uma revisão compartilhada de segurança.','Map cloud components, pipeline trust boundaries and potential failure scenarios.','Mapear componentes cloud, fronteiras de confiança do pipeline e possíveis cenários de falha.'],
 ['plot4ai','AI initiatives need risks and ownership discussed before approval.','Iniciativas de IA precisam discutir riscos e responsáveis antes da aprovação.','Explore an AI use case, affected stakeholders and candidate risk controls.','Explorar um caso de uso de IA, as partes afetadas e possíveis controles de risco.'],
 ['ml-security','ML teams need to consider security throughout data, training and model deployment.','Equipes de ML precisam considerar segurança nos dados, treinamento e implantação de modelos.','Map the ML lifecycle and discuss threats at each relevant boundary.','Mapear o ciclo de ML e discutir ameaças em cada fronteira relevante.'],
 ['fuzznet','Teams need shared AI vocabulary before collaborating on technical decisions.','Equipes precisam de vocabulário comum sobre IA antes de colaborar em decisões técnicas.','Connect the model-building gameplay to concepts the team needs to understand.','Relacionar a dinâmica de construção de modelos aos conceitos que a equipe precisa compreender.'],
 ['ai-ethics','AI adoption raises competing expectations that policy alone may not resolve.','A adoção de IA traz expectativas conflitantes que uma política isolada pode não resolver.','Discuss ethical scenarios and record unresolved questions for governance owners.','Discutir cenários éticos e registrar questões pendentes para responsáveis pela governança.'],
 ['linddun','Product teams need to surface privacy risks before personal-data processing is fixed in the design.','Equipes de produto precisam identificar riscos de privacidade antes de consolidar o tratamento de dados no projeto.','Review data flows and record privacy threats for subsequent risk treatment or DPIA preparation.','Revisar fluxos de dados e registrar ameaças de privacidade para tratamento de riscos ou preparação de uma DPIA.'],
 ['context-cringe','Product decisions need a conversation about whether data use fits user expectations.','Decisões de produto precisam considerar se o uso de dados corresponde às expectativas das pessoas.','Discuss data collection scenarios and formulate privacy questions for product discovery.','Discutir cenários de coleta de dados e formular perguntas de privacidade para a descoberta de produto.'],
 ['backdoors','Response teams need to rehearse coordination and find gaps before a real incident.','Equipes de resposta precisam exercitar a coordenação e encontrar lacunas antes de um incidente real.','Walk through a simulated incident, capture decisions and debrief response gaps.','Percorrer um incidente simulado, registrar decisões e discutir lacunas na resposta.'],
 ['insider','Security, HR and legal teams need to align their response to insider-risk scenarios.','Segurança, RH e jurídico precisam alinhar a resposta a cenários de risco interno.','Discuss an insider scenario, escalation responsibilities and potential control gaps.','Discutir um cenário interno, responsabilidades de escalonamento e possíveis lacunas de controles.'],
 ['phishing','Employees need opportunities to practise recognizing suspicious messages after awareness training.','Colaboradores precisam praticar o reconhecimento de mensagens suspeitas após treinamentos de conscientização.','Discuss phishing cues and connect observations to the organization’s reporting process.','Discutir sinais de phishing e relacionar as observações ao processo de reporte da organização.'],
 ['byte-club','New joiners need an accessible introduction to attacker and defender perspectives.','Novos integrantes precisam de uma introdução acessível às perspectivas de ataque e defesa.','Discuss attack and defense decisions and connect them to everyday security habits.','Discutir decisões de ataque e defesa e relacioná-las a hábitos cotidianos de segurança.']
].map(([id,en,pt,activityEn,activityPt])=>[id,{challenge:pair(en,pt),activity:pair(activityEn,activityPt)}]));
const serviceProcesses = {
 'eop':['join improve','design build','design build improve'],
 'eop-privacy':['design','plan design govern'],
 'architects':['join improve','design'],
 'cornucopia-web':['plan build','design build join'],
 'cornucopia-mobile':['design','join design build'],
 'cornucopia-companion':['design build','design govern'],
 'cumulus':['join design','design build operate'],
 'plot4ai':['plan design','govern'],
 'ml-security':['join design build','design govern'],
 'fuzznet':['join build','join improve'],
 'ai-ethics':['govern improve','plan govern'],
 'linddun':['design','plan design govern'],
 'context-cringe':['plan design','join'],
 'backdoors':['join respond','operate respond improve'],
 'insider':['operate respond','govern respond improve'],
 'phishing':['improve','join improve'],
 'byte-club':['join','join improve']
};
export const useCases = rows.flatMap(r=>r[7].split('|').map((name,i)=>({
 id:r[0]+'-service-'+(i+1),serviceId:r[0]+'-service-'+(i+1),gameIds:[r[0]],
 name:pair(name,r[8].split('|')[i]),domains:r[4].split(' '),processes:serviceProcesses[r[0]][i].split(' '),audiences:r[6].split(' '),
 engagements: /Onboarding|Foundations|Literacy|Awareness|Fundamentals|Bootcamp/.test(name)?['learn','practice','embed']:/Enablement/.test(name)?['embed']:['practice','assess','embed'],
 deliverable:pair(r[9],r[10]),educational:['architects','fuzznet','context-cringe','phishing','byte-club','ai-ethics'].includes(r[0])
})));
export const defaultState = {mode:'challenge',view:'cards',q:'',game:'',domain:'',process:'',audience:'',engagement:''};
export function readState(search) {
 const params=new URLSearchParams(search);const state={...defaultState};
 for(const key of Object.keys(state)) state[key]=params.get('map-'+key)||state[key];
 for(const [key,values] of Object.entries({mode:['challenge','game'],view:['cards','matrix'],game:games.map(g=>g.id),domain:Object.keys(domains),process:Object.keys(processes),audience:Object.keys(audiences),engagement:Object.keys(engagements)})) if(state[key]&&!values.includes(state[key]))state[key]=defaultState[key];
 state.q=state.q.slice(0,160);return state;
}
export function matchingCases(state) {
 const q=state.q.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().trim();
 return useCases.filter(u=>(!state.game||u.gameIds.includes(state.game))&&(!state.domain||u.domains.includes(state.domain))&&(!state.process||u.processes.includes(state.process))&&(!state.audience||u.audiences.includes(state.audience))&&(!state.engagement||u.engagements.includes(state.engagement))&&(!q||JSON.stringify([u.name,u.deliverable,u.gameIds.map(id=>games.find(g=>g.id===id).title),u.domains.map(id=>domains[id]),u.processes.map(id=>processes[id]),u.audiences.map(id=>audiences[id])]).normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().includes(q)));
}
