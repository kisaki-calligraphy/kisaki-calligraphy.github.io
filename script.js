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
    about_text: `Calligraphy Artist - Kisaki -

"The soul is mirrored in one’s handwriting." This is a belief held dear in Japan since ancient times.
As a child, I was reserved and found it difficult to express my emotions.
But at the age of three, I discovered Shodo—Japanese calligraphy. 
When I held a brush, I finally found a way to express myself freely, letting my feelings flow into every stroke.

Calligraphy is a mysterious art; the final piece changes depending on one’s state of mind and circumstances.

Some days, the strokes are bold and dynamic. Other days, the lines are delicate and fine. 
There are days when the brush glides across the paper with effortless grace.
And then, there are days when the brush simply refuses to move. It is this profound depth that fascinates me, and I am dedicated to sharing the beauty of Shodo with the world.
In calligraphy and art, there is no "correct" way, nor are there fixed models to follow. There is no "good" or "bad." 

I believe that simply enjoying the process and creating from the heart is one of the truest ways to express one's soul. 

My hope is that calligraphy art becomes something that people of all generations and nationalities can feel close to and enjoy.`,
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
    about_text: `書道アーティスト妃 - Kisaki -


"文字にはその人の魂が映し出される"日本では古くから言われています。
幼いころはあまり自分を前に出さず、自分の感情を表現することが苦手だった私は、
三歳の頃に「書道」と出会い、筆を持つ時は自分の思うように文字として自分を表現できました。
書は不思議なもので、その時の心の在り方や状況で、違った仕上がりになります。

ダイナミックに書ける日
繊細な線で書く日
何を書いても気持ち良くさらさらと書ける日

逆に、全く筆が進まない日もあります。
とても奥が深く、是非多くの方に書道の魅力を知ってもらいたく活動しております。
書やアートに見本や正解はありません。
上手い下手もありません。
心のままに楽しむことが、自分の魂を表現できる方法の一つだと考えています。
書道アートが様々な世代、国籍の方にも親しみやすくなっていただけると嬉しいです。`,
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
