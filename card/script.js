const i18n = {
  en: {
    skip: "Skip to content",
    theme: "Dark",
    language: "PT-BR",
    eyebrow: "NFC contact card",
    statement: "I help you ship secure software.",
    saveContact: "Save contact",
    bookCall: "Book a call",
    privacy: "Basic analytics may be used to understand engagement. No personal data is collected."
  },
  pt: {
    skip: "Pular para o conteúdo",
    theme: "Escuro",
    language: "EN-US",
    eyebrow: "Cartão de contato NFC",
    statement: "Eu ajudo você a entregar software seguro.",
    saveContact: "Salvar contato",
    bookCall: "Marcar conversa",
    privacy: "Analytics básico pode ser usado para entender engajamento. Nenhum dado pessoal é coletado."
  }
};

const root = document.documentElement;
const params = new URLSearchParams(window.location.search);

const state = {
  theme: localStorage.getItem("cassio-card-theme") ||
    (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"),
  lang: localStorage.getItem("cassio-card-lang") ||
    (navigator.language && navigator.language.toLowerCase().startsWith("pt") ? "pt" : window.CARD_CONFIG?.defaultLanguage || "en")
};

function track(eventName, params = {}) {
  const payload = {
    card_id: new URLSearchParams(window.location.search).get("id") || undefined,
    source: new URLSearchParams(window.location.search).get("src") || undefined,
    language: state.lang,
    theme: state.theme,
    page_path: window.location.pathname,
    ...params
  };

  Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }

  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    console.debug("[track]", eventName, payload);
  }
}

function applyTheme(theme) {
  state.theme = theme;
  root.dataset.theme = theme;
  localStorage.setItem("cassio-card-theme", theme);
  document.querySelector("[data-i18n='theme']").textContent = theme === "dark"
    ? (state.lang === "pt" ? "Claro" : "Light")
    : (state.lang === "pt" ? "Escuro" : "Dark");
  document.querySelector("meta[name='theme-color']")
    ?.setAttribute("content", theme === "dark" ? "#11100d" : "#f2eadf");
}

function applyLanguage(lang) {
  state.lang = lang === "pt" ? "pt" : "en";
  localStorage.setItem("cassio-card-lang", state.lang);

  document.documentElement.lang = state.lang === "pt" ? "pt-BR" : "en-US";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (i18n[state.lang][key]) node.textContent = i18n[state.lang][key];
  });

  const title = state.lang === "pt"
    ? "Cássio Pereira | AppSec Specialist"
    : "Cássio Pereira | AppSec Specialist";

  document.title = title;
  document
    .querySelector("meta[name='description']")
    ?.setAttribute("content", state.lang === "pt"
      ? "Cássio Pereira, AppSec Specialist. Eu ajudo você a entregar software seguro."
      : "Cássio Pereira, AppSec Specialist. I help you ship secure software."
    );
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(state.lang);
  applyTheme(state.theme);

  const cardId = params.get("id");
  const source = params.get("src");

  track("card_view", {
    card_id: cardId || undefined,
    source: source || "direct"
  });

  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const next = state.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    track("toggle_theme", { selected_theme: next });
  });

  document.getElementById("langToggle")?.addEventListener("click", () => {
    const next = state.lang === "pt" ? "en" : "pt";
    applyLanguage(next);
    track("toggle_language", { selected_language: next });
  });

  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      track(el.getAttribute("data-track"), {
        label: el.getAttribute("data-track-label") || el.textContent.trim(),
        href: el.href || undefined
      });
    });
  });
});