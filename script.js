/*
 * YORU LAB content settings
 *
 * TEMP DATA: replace only the values below when real products are ready.
 * Affiliate URLs intentionally remain "#" until the affiliate review is complete.
 */
const THREADS_URL = "#";

// TEMP DATA: this array is the single source for the discovery cards.
const PRODUCTS = [
  {
    number: "#01",
    tag: "LONG SELLER",
    title: "レビュー数が多いのに、ランキングでは目立たない作品",
    rating: "4.6",
    reviews: "428",
    note: "発売から時間が経っているのに評価が落ちていないタイプ。ロングセラー候補として観察中。",
    affiliateUrl: "#",
  },
  {
    number: "#02",
    tag: "STEADY RANK",
    title: "発売後も順位が落ちにくい作品",
    rating: "4.5",
    reviews: "312",
    note: "短期的な話題性より、長期間レビューが積み上がっているタイプ。",
    affiliateUrl: "#",
  },
  {
    number: "#03",
    tag: "GAP ANALYSIS",
    title: "ランキングと評価の差が大きい作品",
    rating: "4.7",
    reviews: "186",
    note: "売上順位よりユーザー評価が目立つ作品。今後順位が上がるか観察。",
    affiliateUrl: "#",
  },
];

const productGrid = document.querySelector("#product-grid");
const toast = document.querySelector("[data-toast]");

function renderProducts() {
  if (!productGrid) return;

  productGrid.innerHTML = PRODUCTS.map((product) => `
    <article class="product-card">
      <div class="product-meta">
        <span class="product-number">DISCOVERY ${product.number}</span>
        <span class="product-tag">${product.tag}</span>
      </div>
      <h3>${product.title}</h3>
      <div class="metrics" aria-label="作品の評価データ">
        <div><span class="metric-label">RATING</span><span class="metric-value">${product.rating} <span class="rating-stars" aria-hidden="true">✦</span></span></div>
        <div><span class="metric-label">REVIEWS</span><span class="metric-value">${product.reviews}<small> 件</small></span></div>
      </div>
      <p class="research-note"><strong>RESEARCH MEMO</strong>${product.note}</p>
      <a class="product-cta" href="${product.affiliateUrl}" data-affiliate-link>作品を見る <span aria-hidden="true">↗</span></a>
    </article>
  `).join("");
}

function bindImageFallbacks() {
  document.querySelectorAll("[data-profile-image], [data-hero-image]").forEach((image) => {
    image.addEventListener("load", () => {
      if (image.naturalWidth > 0) image.closest(".visual-card, .brand-icon")?.classList.add("has-image");
    });
    image.addEventListener("error", () => {
      image.closest(".visual-card, .brand-icon")?.classList.remove("has-image");
      image.setAttribute("aria-hidden", "true");
    });
    if (image.complete && image.naturalWidth > 0) image.closest(".visual-card, .brand-icon")?.classList.add("has-image");
  });
}

let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function bindNavigation() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 12), { passive: true });
  toggle?.addEventListener("click", () => {
    const isOpen = toggle.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenu?.classList.toggle("is-open", isOpen);
  });
  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    toggle?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
  }));
}

function bindConfiguredLinks() {
  document.querySelectorAll("[data-threads-link]").forEach((link) => {
    link.href = THREADS_URL;
    link.addEventListener("click", (event) => {
      if (THREADS_URL === "#") {
        event.preventDefault();
        showToast("Threads URLは script.js の THREADS_URL に設定できます。");
      }
    });
  });

  document.querySelectorAll("[data-affiliate-link]").forEach((link) => link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#") {
      event.preventDefault();
      showToast("アフィリエイトURLは審査後に PRODUCTS へ設定できます。");
    }
  }));
}

renderProducts();
bindImageFallbacks();
bindNavigation();
bindConfiguredLinks();

