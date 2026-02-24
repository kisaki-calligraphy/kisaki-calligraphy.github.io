// ============================================================
// Kisaki Calligraphy – Language Switching & Interactivity
// ============================================================

const translations = {
  en: {
    nav_gallery: "Gallery",
    nav_about: "About",
    nav_contact: "Contact",
    hero_title: "Kisaki",
    hero_subtitle: "The art of the brush — where silence becomes form.",
    hero_cta: "View Gallery",
    gallery_title: "Gallery",
    artwork1_title: "Tranquility",
    artwork1_meta: "Ink on washi · 2024",
    artwork2_title: "Flow",
    artwork2_meta: "Ink on silk · 2024",
    artwork3_title: "Breath",
    artwork3_meta: "Ink on washi · 2023",
    artwork4_title: "Stillness",
    artwork4_meta: "Ink on rice paper · 2023",
    artwork5_title: "Infinity",
    artwork5_meta: "Ink on silk · 2022",
    artwork6_title: "Dawn",
    artwork6_meta: "Ink on washi · 2022",
    about_title: "About",
    about_p1: "Kisaki is a contemporary calligraphy artist whose work bridges the ancient traditions of East Asian brush art with modern sensibility. Each stroke is a meditation, each composition a quiet conversation between ink, paper, and the present moment.",
    about_p2: "Working primarily with sumi ink on washi and silk, Kisaki's pieces explore themes of impermanence, presence, and the beauty found in simplicity. The practice is rooted in the Japanese concept of ma — the power of negative space.",
    about_p3: "Kisaki has exhibited in galleries across Japan, France, and the United States, and accepts commissions for private collections and public spaces.",
    contact_title: "Contact",
    contact_email_label: "Email",
    contact_instagram_label: "Instagram",
    footer_copy: "© 2024 Kisaki. All rights reserved.",
  },
  ja: {
    nav_gallery: "ギャラリー",
    nav_about: "プロフィール",
    nav_contact: "お問い合わせ",
    hero_title: "妃",
    hero_subtitle: "筆の芸術 — 静寂が形になる瞬間。",
    hero_cta: "作品を見る",
    gallery_title: "ギャラリー",
    artwork1_title: "静寂",
    artwork1_meta: "墨・和紙 · 2024年",
    artwork2_title: "流れ",
    artwork2_meta: "墨・絹 · 2024年",
    artwork3_title: "息吹",
    artwork3_meta: "墨・和紙 · 2023年",
    artwork4_title: "静止",
    artwork4_meta: "墨・和紙 · 2023年",
    artwork5_title: "無限",
    artwork5_meta: "墨・絹 · 2022年",
    artwork6_title: "夜明け",
    artwork6_meta: "墨・和紙 · 2022年",
    about_title: "プロフィール",
    about_p1: "妃（キサキ）は、東アジアの書道の伝統と現代的な感性を融合させた書道アーティストです。一筆一筆が瞑想であり、それぞれの作品は墨、紙、そして現在という瞬間との静かな対話です。",
    about_p2: "主に墨汁と和紙・絹を使用し、無常、存在、そしてシンプルさの中に見出される美しさをテーマに作品を制作しています。その表現は日本の「間」の概念、すなわち余白が持つ力に根ざしています。",
    about_p3: "日本、フランス、アメリカ各地のギャラリーで展示を行い、個人コレクションや公共空間へのコミッションも承っています。",
    contact_title: "お問い合わせ",
    contact_email_label: "メール",
    contact_instagram_label: "インスタグラム",
    footer_copy: "© 2024 妃（Kisaki）. 無断転載禁止。",
  },
};

let currentLang = localStorage.getItem("kisaki_lang") || "en";

function applyTranslations(lang) {
  const t = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });
  document.documentElement.lang = lang === "ja" ? "ja" : "en";
}

function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem("kisaki_lang", lang);
  applyTranslations(lang);

  // Update button states
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// Wire up language buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  // Apply persisted language on load
  setLang(currentLang);
});
