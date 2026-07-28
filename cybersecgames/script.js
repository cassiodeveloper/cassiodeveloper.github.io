(() => {
  'use strict';

  const translations = {
    'pt-BR': {
      skip: 'Pular para o conteúdo principal',
      brandRole: 'Facilitador CyberSec Games',
      menu: 'Menu',
      navLabel: 'Navegação principal',
      languageLabel: 'Idioma',
      navHow: 'Como funciona',
      navBenefits: 'Benefícios',
      navFormats: 'Formatos',
      navAbout: 'Sobre Cássio',
      navBook: 'Agendar uma sessão',
      heroBadge: 'Facilitador CyberSec Games',
      heroTitle: 'Um treinamento de segurança que seu time vai realmente lembrar.',
      heroLead: 'Sessões facilitadas com CyberSec Games que ajudam times a discutir riscos reais, tomar melhores decisões de segurança e aprender por meio do jogo.',
      heroCta: 'Agendar uma sessão facilitada',
      heroSecondary: 'Veja como funciona',
      maker: 'A CyberSec Games cria os jogos.',
      facilitates: 'Cássio facilita a experiência.',
      themesLabel: 'Temas das sessões',
      strip1: 'Modelagem de ameaças',
      strip2: 'Design seguro',
      strip3: 'Privacidade',
      strip4: 'Resposta a incidentes',
      strip5: 'Cultura de segurança',
      sessionPhotoAlt: 'Participantes colaborando ao redor de uma mesa com jogos físicos de cibersegurança',
      sessionPhotoCaption: 'Segurança prática. Conversas reais. Resultados úteis.',
      gamesPhotoAlt: 'Uma seleção de jogos físicos de cartas sobre cibersegurança',
      introEyebrow: 'Menos apresentação. Mais participação.',
      introTitle: 'Transforme conversas sobre cibersegurança em experiências compartilhadas',
      introP1: 'Treinamentos de segurança muitas vezes viram mais uma apresentação, mais um checklist ou mais uma hora de pessoas fingindo prestar atenção.',
      introP2: 'CyberSec Games propõe uma abordagem diferente.',
      introP3: 'Com jogos físicos e colaborativos cuidadosamente desenvolvidos, os times exploram juntos desafios de cibersegurança, discutem prioridades concorrentes e praticam decisões em um ambiente seguro.',
      introP4: 'Como Facilitador CyberSec Games, Cássio conduz a experiência, mantém os participantes engajados e conecta os aprendizados do jogo ao contexto real da organização.',
      howEyebrow: 'Uma jornada de aprendizagem intencional',
      howTitle: 'Como funciona uma sessão facilitada',
      step1Title: 'Entender o objetivo',
      step1Text: 'Antes da sessão, conversamos sobre o público, o contexto do negócio, os desafios atuais e os resultados esperados.',
      step2Title: 'Selecionar o jogo certo',
      step2Text: 'A experiência é alinhada ao time, ao tema, à profundidade técnica e ao tempo disponível.',
      step3Title: 'Facilitar a sessão',
      step3Text: 'O facilitador apresenta o jogo, explica as regras, estimula a participação e mantém as discussões produtivas.',
      step4Title: 'Debrief da experiência',
      step4Text: 'A sessão termina com uma conversa estruturada sobre decisões, padrões, riscos e aprendizados.',
      step5Title: 'Aplicar o aprendizado',
      step5Text: 'Os insights podem ser convertidos em recomendações, ações, requisitos ou próximos passos.',
      benefitsEyebrow: 'Aprendizado que circula pela mesa',
      benefitsTitle: 'O que seu time leva da sessão',
      benefit1Title: 'Participação ativa',
      benefit1Text: 'Os jogadores contribuem, questionam premissas, negociam decisões e aprendem uns com os outros.',
      benefit2Title: 'Melhores conversas sobre segurança',
      benefit2Text: 'Temas complexos ficam mais fáceis de discutir entre segurança, engenharia, produto, risco e negócio.',
      benefit3Title: 'Aprendizado prático',
      benefit3Text: 'Os participantes trabalham com situações realistas envolvendo ameaças, privacidade, arquitetura e decisões de negócio.',
      benefit4Title: 'Responsabilidade compartilhada',
      benefit4Text: 'Segurança deixa de ser algo pertencente exclusivamente ao time de segurança.',
      benefit5Title: 'Insights acionáveis',
      benefit5Text: 'As sessões podem revelar riscos, premissas, falhas de processo e oportunidades de melhoria.',
      benefit6Title: 'Uma experiência memorável',
      benefit6Text: 'As pessoas lembram das decisões, discussões e erros cometidos durante um jogo. Ninguém lembra do slide 47.',
      differenceEyebrow: 'Material versus experiência',
      differenceTitle: 'Um facilitador muda o jogo',
      differenceP1: 'Comprar um jogo de cibersegurança entrega o material.',
      differenceP2: 'Uma sessão facilitada entrega a experiência.',
      facilitation1: 'Define um objetivo de aprendizagem claro',
      facilitation2: 'Adapta a sessão ao público',
      facilitation3: 'Estimula a participação equilibrada',
      facilitation4: 'Mantém as discussões produtivas',
      facilitation5: 'Conecta o jogo a decisões reais de engenharia',
      facilitation6: 'Ajuda os times a refletir sobre trade-offs',
      facilitation7: 'Conduz um debrief estruturado',
      facilitation8: 'Transforma conversas em aprendizados práticos',
      topicsEyebrow: 'Comece pelo desafio',
      topicsTitle: 'Escolha a conversa de que seu time precisa',
      topicsLead: 'O jogo é escolhido a partir do objetivo de aprendizagem — e não o contrário.',
      topicsLabel: 'Temas disponíveis',
      topic1: 'Modelagem de Ameaças',
      topic2: 'Segurança de Aplicações',
      topic3: 'Design Seguro',
      topic4: 'Privacidade',
      topic5: 'Resposta a Incidentes',
      topic6: 'Conscientização em Cibersegurança',
      topic7: 'Cultura de Segurança',
      topic8: 'Security Champions',
      topic9: 'Segurança em Nuvem',
      topic10: 'Segurança e Ética em IA',
      topic11: 'Comunicação de Risco',
      topic12: 'Colaboração entre Times',
      gameExamplesLabel: 'Possíveis exemplos de jogos',
      selectionNote: 'A seleção final considera o objetivo, o público, o número de participantes, o tempo disponível, o nível técnico e o contexto da organização.',
      portraitAlt: 'Retrato profissional de Cássio B. Pereira',
      portraitCaption: 'Especialista em Application Security · Professor · Palestrante · Criador de jogos',
      aboutEyebrow: 'Seu facilitador',
      aboutP1: 'Especialista em Application Security, professor, autor, host de podcast, palestrante internacional e criador de serious games, com mais de duas décadas de experiência em desenvolvimento de software, arquitetura e cibersegurança.',
      aboutP2: 'Ele desenvolveu e conduziu iniciativas de Application Security, DevSecOps, Threat Modeling e Security Champions para pessoas desenvolvedoras, profissionais de segurança, executivos e áreas de negócio.',
      aboutP3: 'Seu estilo de facilitação combina credibilidade técnica, storytelling, discussão prática e provocação suficiente para manter a sala desperta.',
      expertiseLabel: 'Áreas de experiência',
      expertise1: 'Segurança de Aplicações',
      expertise2: 'DevSecOps',
      expertise3: 'Modelagem de Ameaças',
      expertise4: 'Security Champions',
      expertise5: 'Desenvolvimento Seguro de Software',
      expertise6: 'Gestão de Vulnerabilidades',
      expertise7: 'Cultura de Segurança',
      expertise8: 'IA e Segurança de Software',
      expertise9: 'Treinamento e Facilitação',
      expertise10: 'Serious Games',
      formatsEyebrow: 'Construído para o seu contexto',
      formatsTitle: 'Formatos disponíveis',
      format1Title: 'Sessão Focada para Times',
      format1Text: 'Uma experiência facilitada para um time de engenharia, produto, arquitetura ou segurança.',
      durationLabel: 'Duração típica',
      format1Duration: '90 minutos a 3 horas',
      format2Title: 'Workshop Corporativo',
      format2Text: 'Uma experiência mais profunda que combina jogo, discussão, contexto técnico e debrief estruturado.',
      format2Duration: 'Meio período ou dia inteiro',
      format3Title: 'Ativação em Conferência',
      format3Text: 'Sessões interativas para conferências, estandes, villages, eventos de comunidade e eventos corporativos.',
      format4Title: 'Sessão para Liderança',
      format4Text: 'Uma sessão focada em risco, prioridades, comunicação e tomada de decisão para líderes e públicos não técnicos.',
      format5Title: 'Experiência para Security Champions',
      format5Text: 'Jogos facilitados para engajar, treinar e desenvolver Security Champions.',
      format6Title: 'Formação de Facilitadores',
      format6Text: 'Uma experiência guiada para organizações que desejam preparar profissionais internos para conduzir atividades de segurança baseadas em jogos com confiança.',
      audiencesEyebrow: 'Uma mesa. Muitas perspectivas.',
      audiencesTitle: 'Criado para times técnicos e não técnicos',
      audiencesNote: 'Os participantes não precisam ter experiência prévia em cibersegurança. A linguagem, a dificuldade e a profundidade técnica são adaptadas ao público.',
      audience1: 'Pessoas Desenvolvedoras',
      audience2: 'Engenheiros de Segurança',
      audience3: 'Gerentes de Produto',
      audience4: 'Arquitetos',
      audience5: 'Security Champions',
      audience6: 'Times de Privacidade',
      audience7: 'Times de Risco e Compliance',
      audience8: 'Gestores de Engenharia',
      audience9: 'Executivos',
      audience10: 'Estudantes Universitários',
      audience11: 'Participantes de Conferências',
      outcomesEyebrow: 'A mudança começa no debrief',
      outcomesTitle: 'Do jogo à mudança real',
      outcome1: 'Mais participação nas discussões de segurança',
      outcome2: 'Mais confiança em modelagem de ameaças',
      outcome3: 'Identificação mais cedo dos riscos',
      outcome4: 'Colaboração mais forte entre segurança e engenharia',
      outcome5: 'Menor dependência de times centrais de segurança',
      outcome6: 'Responsabilidade compartilhada por segurança',
      outcome7: 'Melhor comunicação de risco',
      outcome8: 'Cultura de segurança fortalecida',
      outcome9: 'Próximos passos práticos após a sessão',
      testimonialsEyebrow: 'Vozes ao redor da mesa',
      testimonialsTitle: 'O que dizem os participantes',
      testimonialPlaceholder: '[DEPOIMENTO DE CLIENTE A SER ADICIONADO]',
      testimonialApproval: 'Espaço reservado para uma citação aprovada de participante ou cliente.',
      faqTitle: 'Boas perguntas antes de o jogo começar',
      faq1Q: 'Os participantes precisam ter experiência em cibersegurança?',
      faq1A: 'Não. O jogo e a facilitação são adaptados ao público.',
      faq2Q: 'A sessão pode usar nossa própria arquitetura ou cenário?',
      faq2A: 'Sim. Dependendo do objetivo, a sessão pode usar um exercício fictício, um cenário adaptado ou o contexto de um sistema real.',
      faq3Q: 'As sessões podem ser realizadas remotamente?',
      faq3A: 'Sim. Sessões remotas podem combinar cartas físicas, ferramentas digitais de colaboração e formatos com suporte para jogo remoto.',
      faq4Q: 'Quanto tempo dura uma sessão?',
      faq4A: 'A maioria das sessões dura de aproximadamente 90 minutos a um dia inteiro.',
      faq5Q: 'Quantas pessoas podem participar?',
      faq5A: 'O número depende do jogo e do formato. As sessões podem atender um time focado, várias mesas ou grupos recorrentes em uma conferência.',
      faq6Q: 'A sessão pode fazer parte de um evento da empresa?',
      faq6A: 'Sim. As sessões podem ser realizadas como workshops, atividades de conferência, cybersecurity villages, treinamentos internos ou experiências de integração de times.',
      faq7Q: 'A sessão está disponível em português e inglês?',
      faq7A: 'Sim. As sessões podem ser facilitadas em inglês ou português brasileiro.',
      contactEyebrow: 'Vamos preparar a mesa',
      contactTitle: 'Pronto para levar CyberSec Games ao seu time?',
      contactP1: 'Conte sobre sua organização, seu público e o desafio de cibersegurança que deseja explorar.',
      contactP2: 'Juntos, podemos escolher o jogo e o formato de sessão que melhor atendem aos seus objetivos.',
      contactCta1: 'Conversar sobre uma sessão',
      contactCta2: 'Levar CyberSec Games ao seu evento',
      availability: 'Disponível para sessões corporativas, conferências, cybersecurity villages e experiências privadas para times na Europa, no Brasil e remotamente.',
      formTitle: 'Conte sobre a sessão',
      formIntro: 'Alguns detalhes são suficientes para começar a conversa.',
      fieldName: 'Nome',
      fieldEmail: 'E-mail corporativo',
      fieldCompany: 'Empresa',
      fieldCountry: 'País',
      fieldParticipants: 'Número de participantes',
      fieldLanguage: 'Idioma preferido',
      fieldDelivery: 'Remoto ou presencial',
      fieldExperience: 'Tipo de experiência',
      fieldDate: 'Data esperada',
      fieldMessage: 'Mensagem',
      selectOption: 'Selecione uma opção',
      remote: 'Remoto',
      onSite: 'Presencial',
      flexible: 'Flexível',
      experienceTeam: 'Sessão para Time',
      experienceWorkshop: 'Workshop Corporativo',
      experienceConference: 'Ativação em Conferência',
      experienceLeadership: 'Sessão para Liderança',
      experienceChampions: 'Security Champions',
      experienceTrain: 'Formação de Facilitadores',
      other: 'Outro',
      messagePlaceholder: 'Qual desafio você gostaria de explorar na sessão?',
      privacyNote: 'Seus dados serão usados apenas para responder a esta solicitação. Sem trackers ou listas de marketing.',
      formSubmit: 'Enviar solicitação',
      formInvalid: 'Revise os campos destacados antes de enviar.',
      formRateLimit: 'Aguarde um minuto antes de enviar outra solicitação.',
      formSending: 'Enviando sua solicitação…',
      formSuccess: 'Obrigado. Sua solicitação foi enviada.',
      formEmailReady: 'Seu aplicativo de e-mail foi aberto com a mensagem pronta para envio.',
      formError: 'Não foi possível enviar agora. Escreva para cassio@cassiobp.com.br.',
      footerPositioning: 'Experiências facilitadas de aprendizagem para melhores conversas e decisões de segurança.',
      footerExplore: 'Explorar',
      footerConnect: 'Contato',
      legal: 'Os nomes, logos e títulos de jogos CyberSec Games pertencem aos seus respectivos proprietários. Esta página apresenta serviços independentes de facilitação realizados em colaboração com a CyberSec Games.'
    }
  };

  const textNodes = Array.from(document.querySelectorAll('[data-i18n]'));
  const ariaNodes = Array.from(document.querySelectorAll('[data-i18n-aria]'));
  const altNodes = Array.from(document.querySelectorAll('[data-i18n-alt]'));
  const placeholderNodes = Array.from(document.querySelectorAll('[data-i18n-placeholder]'));
  const english = {
    text: Object.fromEntries(textNodes.map((node) => [node.dataset.i18n, node.textContent.trim()])),
    aria: Object.fromEntries(ariaNodes.map((node) => [node.dataset.i18nAria, node.getAttribute('aria-label')])),
    alt: Object.fromEntries(altNodes.map((node) => [node.dataset.i18nAlt, node.getAttribute('alt')])),
    placeholder: Object.fromEntries(placeholderNodes.map((node) => [node.dataset.i18nPlaceholder, node.getAttribute('placeholder')]))
  };

  const metadata = {
    en: {
      title: 'CyberSec Games Facilitator | Cássio B. Pereira',
      description: 'Facilitated cybersecurity game sessions for engineering, security, product and leadership teams. Learn threat modeling, privacy, incident response and secure design through play.',
      social: 'Facilitated cybersecurity game sessions that turn complex security conversations into memorable, practical learning.',
      locale: 'en_US'
    },
    'pt-BR': {
      title: 'Facilitador CyberSec Games | Cássio B. Pereira',
      description: 'Sessões facilitadas com jogos de cibersegurança para times de engenharia, segurança, produto e liderança. Aprenda por meio do jogo.',
      social: 'Sessões facilitadas que transformam conversas complexas sobre segurança em aprendizado prático e memorável.',
      locale: 'pt_BR'
    }
  };

  let activeLanguage = 'en';

  function setMeta(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.setAttribute('content', value);
  }

  function applyLanguage(language, updateUrl = true) {
    activeLanguage = language === 'pt-BR' ? 'pt-BR' : 'en';
    const dictionary = activeLanguage === 'pt-BR' ? translations['pt-BR'] : english.text;

    textNodes.forEach((node) => {
      const value = dictionary[node.dataset.i18n];
      if (typeof value === 'string') node.textContent = value;
    });
    ariaNodes.forEach((node) => {
      const key = node.dataset.i18nAria;
      const value = activeLanguage === 'pt-BR' ? translations['pt-BR'][key] : english.aria[key];
      if (typeof value === 'string') node.setAttribute('aria-label', value);
    });
    altNodes.forEach((node) => {
      const key = node.dataset.i18nAlt;
      const value = activeLanguage === 'pt-BR' ? translations['pt-BR'][key] : english.alt[key];
      if (typeof value === 'string') node.setAttribute('alt', value);
    });
    placeholderNodes.forEach((node) => {
      const key = node.dataset.i18nPlaceholder;
      const value = activeLanguage === 'pt-BR' ? translations['pt-BR'][key] : english.placeholder[key];
      if (typeof value === 'string') node.setAttribute('placeholder', value);
    });

    const meta = metadata[activeLanguage];
    document.documentElement.lang = activeLanguage;
    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.social);
    setMeta('meta[property="og:locale"]', meta.locale);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.social);

    document.querySelectorAll('[data-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === activeLanguage));
    });

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (activeLanguage === 'en') url.searchParams.delete('lang');
      else url.searchParams.set('lang', 'pt-BR');
      window.history.replaceState({}, '', url);
    }
  }

  const languageParam = new URLSearchParams(window.location.search).get('lang');
  applyLanguage(languageParam === 'pt' || languageParam === 'pt-BR' ? 'pt-BR' : 'en', false);
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.language));
  });

  const menuButton = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  function closeMenu() {
    document.body.classList.remove('menu-open');
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else {
      document.body.classList.add('menu-open');
      nav.classList.add('is-open');
      menuButton.setAttribute('aria-expanded', 'true');
    }
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const header = document.querySelector('[data-header]');
  const updateHeader = () => header.classList.toggle('is-stuck', window.scrollY > 40);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelector('[data-year]').textContent = String(new Date().getFullYear());

  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');
  const dateField = form.elements.expectedDate;
  dateField.min = new Date().toISOString().split('T')[0];

  // Set endpoint to a same-origin form handler when a backend is available.
  // Never place API keys or service secrets in this client-side configuration.
  const CONTACT_CONFIG = Object.freeze({
    endpoint: '',
    fallbackEmail: 'cassio@cassiobp.com.br',
    cooldownMs: 60000
  });

  function statusMessage(key, type) {
    const value = activeLanguage === 'pt-BR' ? translations['pt-BR'][key] : {
      formInvalid: 'Review the highlighted fields before sending.',
      formRateLimit: 'Please wait one minute before sending another enquiry.',
      formSending: 'Sending your enquiry…',
      formSuccess: 'Thank you. Your enquiry has been sent.',
      formEmailReady: 'Your email app has opened with a ready-to-send message.',
      formError: 'Unable to send right now. Please email cassio@cassiobp.com.br.'
    }[key];
    status.textContent = value || '';
    status.className = 'form-status' + (type ? ' is-' + type : '');
  }

  function payloadFromForm(formData) {
    return {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      country: String(formData.get('country') || '').trim(),
      participants: String(formData.get('participants') || '').trim(),
      preferredLanguage: String(formData.get('preferredLanguage') || '').trim(),
      delivery: String(formData.get('delivery') || '').trim(),
      experience: String(formData.get('experience') || '').trim(),
      expectedDate: String(formData.get('expectedDate') || '').trim(),
      message: String(formData.get('message') || '').trim()
    };
  }

  function createEmailBody(payload) {
    return [
      'Name: ' + payload.name,
      'Business email: ' + payload.email,
      'Company: ' + payload.company,
      'Country: ' + payload.country,
      'Participants: ' + payload.participants,
      'Preferred language: ' + payload.preferredLanguage,
      'Delivery: ' + payload.delivery,
      'Experience: ' + payload.experience,
      'Expected date: ' + (payload.expectedDate || 'Not specified'),
      '',
      'Message:',
      payload.message
    ].join('\n');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    statusMessage('', '');

    if (!form.checkValidity()) {
      form.reportValidity();
      statusMessage('formInvalid', 'error');
      return;
    }

    const formData = new FormData(form);
    if (String(formData.get('website') || '').trim()) {
      statusMessage('formSuccess', 'success');
      form.reset();
      return;
    }

    const lastSubmission = Number(window.localStorage.getItem('csg-last-submission') || 0);
    if (Date.now() - lastSubmission < CONTACT_CONFIG.cooldownMs) {
      statusMessage('formRateLimit', 'error');
      return;
    }

    const payload = payloadFromForm(formData);
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
      if (CONTACT_CONFIG.endpoint) {
        statusMessage('formSending', '');
        const response = await fetch(CONTACT_CONFIG.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
          credentials: 'same-origin'
        });
        if (!response.ok) throw new Error('Form endpoint rejected the request');
        window.localStorage.setItem('csg-last-submission', String(Date.now()));
        form.reset();
        statusMessage('formSuccess', 'success');
      } else {
        const subject = 'CyberSec Games facilitated session — ' + payload.company;
        const mailto = 'mailto:' + CONTACT_CONFIG.fallbackEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(createEmailBody(payload));
        window.localStorage.setItem('csg-last-submission', String(Date.now()));
        window.location.assign(mailto);
        statusMessage('formEmailReady', 'success');
      }
    } catch (_error) {
      statusMessage('formError', 'error');
    } finally {
      submitButton.disabled = false;
    }
  });
})();
