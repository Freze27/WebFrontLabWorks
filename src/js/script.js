import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "/src/sass/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const sliderEl = document.querySelector(".works__slider");

  if (sliderEl) {
    new Swiper(sliderEl, {
      modules: [Navigation, Pagination],
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".my-next-button",
        prevEl: ".my-prev-button",
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        1920: {
          slidesPerView: 3,
          spaceBetween: 35,
        },
      },
    });
  }
});

const API_BASE = "https://ceramic-api.onrender.com";

function productToHTML(p) {
  return `
    <article class="catalog__item">
      <img src="${new URL(p.image, API_BASE)}" alt="${p.title}" loading="lazy">
      <div class="catalog__info">
        <h3 class="subtitle-h3">${p.title}</h3>
        <p class="text">${p.price} €</p>
      </div>
    </article>`;
}

async function fetchProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  return res.json();
}

async function renderProducts(category = "tea") {
  const grid = document.querySelector(".catalog__grid");
  if (!grid) {
    return console.warn("No .catalog__grid found");
  }

  grid.innerHTML = `<div class="loading">Loading…</div>`;

  try {
    const data = await fetchProducts();

    let shown = [];
    if (category === "tea") shown = data.slice(0, 5);
    if (category === "kitchen") shown = data.slice(0, 3);
    if (category === "plants") shown = data.slice(0, 2);

    grid.innerHTML = shown.map(productToHTML).join("");
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<div class="error">Failed to load</div>`;
  }
}

function setupTabs() {
  const buttons = document.querySelectorAll(".catalog__filter");
  if (!buttons.length) return;

  buttons.forEach((btn) =>
    btn.addEventListener("click", async () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      await renderProducts(category);
    })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  renderProducts("tea");
});

const burger = document.querySelector(".burger"),
      close = document.querySelector(".header__menu-close"),
      menu = document.querySelector(".header__menu");

burger.addEventListener("click", () => {
    menu.classList.add("header__menu_active");
    document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
    menu.classList.remove("header__menu_active");
    document.body.style.overflow = "";
});


try {
 const validatorFooter = new JustValidate(".footer__form");

 validatorFooter
  .addField(
   "#footer__email",
   [
    {
     rule: "required",
    },
    {
     rule: "email",
    },
   ],
   {
    errorsContainer: document
     .querySelector("#footer__email")
     .parentElement.querySelector(".email-error-message"),
   }
  )
  .addField(
   "#footer__checkbox",
   [
    {
     rule: "required",
    },
   ],
   {
    errorsContainer: document
     .querySelector("#footer__checkbox")
     .parentElement.parentElement.querySelector(".check-error-message"),
   }
  )
  .onSuccess((event) => {
   const form = event.currentTarget;
   const formData = new FormData(form);

   fetch("https://httpbin.org/post", {
    method: "POST",
    body: formData,
   })
    .then((res) => res.json())
    .then((data) => {
     console.log("Success", data);
     form.reset();
    });
  });
} catch (e) {}
