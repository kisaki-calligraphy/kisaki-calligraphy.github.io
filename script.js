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
    footer_copy: "© 2026 Kisaki. All rights reserved.",
  },
  ja: {
    nav_gallery: "ギャラリー",
    nav_about: "プロフィール",
    nav_contact: "お問い合わせ",
    hero_title: "妃",
    hero_subtitle: "筆の芸術 — 静寂が形になる瞬間。",
    hero_cta: "作品を見る",
    gallery_title: "ギャラリー",
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
    footer_copy: "© 2026 妃（Kisaki）. 無断転載禁止。",
  },
};

let currentLang = localStorage.getItem("kisaki_lang") || "en";
let lightboxElements = null;
let galleryImageElements = [];
let activeLightboxIndex = -1;

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

function initializeLightbox() {
  if (lightboxElements) return lightboxElements;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.setAttribute("aria-hidden", "true");

  const frame = document.createElement("div");
  frame.className = "lightbox-frame";

  const image = document.createElement("img");
  image.className = "lightbox-image";
  image.alt = "Enlarged artwork";
  image.draggable = false;

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.className = "lightbox-nav lightbox-prev";
  prevButton.setAttribute("aria-label", "Previous image");
  prevButton.textContent = "‹";

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "lightbox-nav lightbox-next";
  nextButton.setAttribute("aria-label", "Next image");
  nextButton.textContent = "›";

  frame.appendChild(prevButton);
  frame.appendChild(image);
  frame.appendChild(nextButton);
  overlay.appendChild(frame);
  document.body.appendChild(overlay);

  const showImageAtIndex = (index) => {
    if (!galleryImageElements.length) return;
    activeLightboxIndex = (index + galleryImageElements.length) % galleryImageElements.length;
    const sourceImage = galleryImageElements[activeLightboxIndex];
    image.src = sourceImage.src;
    image.alt = sourceImage.alt || "Enlarged artwork";
  };

  const closeLightbox = () => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  };

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeLightbox();
    }
  });

  prevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showImageAtIndex(activeLightboxIndex - 1);
  });

  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showImageAtIndex(activeLightboxIndex + 1);
  });

  let touchStartX = 0;
  let touchStartY = 0;
  let swipeActive = false;

  image.addEventListener("touchstart", (event) => {
    if (!overlay.classList.contains("open") || event.touches.length !== 1) return;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    swipeActive = true;
  }, { passive: true });

  image.addEventListener("touchend", (event) => {
    if (!swipeActive || !overlay.classList.contains("open") || !galleryImageElements.length) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const isHorizontalSwipe = Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3;

    if (isHorizontalSwipe) {
      if (deltaX < 0) {
        showImageAtIndex(activeLightboxIndex + 1);
      } else {
        showImageAtIndex(activeLightboxIndex - 1);
      }
    }

    swipeActive = false;
  }, { passive: true });

  image.addEventListener("touchcancel", () => {
    swipeActive = false;
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("open")) return;

    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && galleryImageElements.length) {
      showImageAtIndex(event.key === "ArrowLeft" ? activeLightboxIndex - 1 : activeLightboxIndex + 1);
    }
  });

  lightboxElements = { overlay, image, closeLightbox, showImageAtIndex };
  return lightboxElements;
}

function openLightbox(sourceImage) {
  const { overlay, showImageAtIndex } = initializeLightbox();
  activeLightboxIndex = galleryImageElements.indexOf(sourceImage);
  showImageAtIndex(activeLightboxIndex);
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

// Wire up language buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  // Apply persisted language on load
  setLang(currentLang);
  
  // Render Gallery
  renderGallery();
});

// ============================================================
// Dynamic Gallery Loading
// ============================================================

async function renderGallery() {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) return;
  
  galleryGrid.innerHTML = ""; // Clear existing content
  galleryImageElements = [];

  try {
    let galleryImages = Array.isArray(window.GALLERY_IMAGES) ? window.GALLERY_IMAGES : null;

    if (!galleryImages) {
      const response = await fetch("gallery.json");
      if (!response.ok) throw new Error("Failed to load gallery manifest");
      galleryImages = await response.json();
    }

    if (!Array.isArray(galleryImages)) {
      throw new Error("Invalid gallery manifest format");
    }
    
    galleryImages.forEach(filename => {
      // Create card
      const article = document.createElement("article");
      article.className = "artwork-card";
  
      // Create image
      const img = document.createElement("img");
      img.src = `assets/gallery/${filename}`;
      img.alt = "Kisaki Calligraphy Artwork"; // Generic alt text
      img.className = "artwork-image";
      img.loading = "lazy"; // Performance optimization
      galleryImageElements.push(img);
      img.addEventListener("click", () => openLightbox(img));
  
      // Assemble
      article.appendChild(img);
      galleryGrid.appendChild(article);
    });
  } catch (error) {
    console.error('Error loading gallery:', error);
    galleryGrid.innerHTML = '<p class="error-message">Unable to load gallery images.</p>';
  }
}
