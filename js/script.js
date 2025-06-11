// ==== 1. Карточка кандидата ====
const cards = {
  card_1: {
    title: "Pristia Candra",
    subtitle: "Senior Product Designer",
    location: "Los Angeles, USA",
    tags: ["Figma", "UI Design", "UX Design"],
    about: "Hi, I’m a final year student completing a bachelor’s in Information Technology in QUT, with experience.",
    portfolioImages: [
      "images/Fram.png",
      "images/Fram2.png",
      "images/Fram3.png"
    ],
    email: "pristia@gmail.com",
    phone: "0809021920139"
  }
};

function getCardData(key) {
  return cards[key] || null;
}

function generateCardTemplate(data) {
  const tagBadges = data.tags.map(tag => `<p class="about__register">${tag}</p>`).join('');

  return `
    <div class="about__wrapper bg-white p-6 rounded shadow-md">
      <div class="about__inner flex justify-between items-start mb-4">
        <div class="about__inner__war">
          <img class="about__avatar" src="images/Ellipse.png" alt="Profile Picture">
          <p class="about__subject font-bold">${data.title}</p>
          <p class="about__caption text-gray-600">${data.subtitle}</p>
          <div class="about__col">
            <p>${data.location}</p>
            <p class="about__slogan">Fulltime Freelancer</p>
          </div>
        </div>
        <div class="about__registertext flex flex-col space-y-2">
          ${tagBadges}
        </div>
      </div>

      <div class="mb-4">
        <p class="about__text font-semibold">About Me</p>
        <p class="about__slogan__text text-sm">${data.about}</p>
      </div>
  `;
}

function insertCandidateCard(containerId, cardKey) {
  const container = document.getElementById(containerId);
  if (!container) return console.error(`Container "${containerId}" not found`);

  const cardData = getCardData(cardKey);
  if (!cardData) return console.warn(`Card "${cardKey}" not found`);

  container.innerHTML = generateCardTemplate(cardData);
}


// ==== 2. Горизонтальные карточки ====
const featureCards = {
  card_1: {
    title: "Professional Profile",
    description: "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on brefolio to show your best self and get discovered by recruiters."
  },
  card_2: {
    title: "Best Portfolio",
    description: "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on brefolio to show your best self and get discovered by recruiters."
  },
  card_3: {
    title: "Powerful Resume",
    description: "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on brefolio to show your best self and get discovered by recruiters."
  }
};

function generateFeatureCardHTML(card) {
  return `
    <div class="card bg-white p-6 rounded shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[250px]">
      <h3 class="text-x font-bold mb-2">${card.title}</h3>
      <p class="text-gray text-sm">${card.description}</p>
    </div>
  `;
}

function renderFeatureCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return console.error(`Container "${containerId}" not found`);

  container.innerHTML = "";
  container.classList.add("grid", "grid-cols-1", "md:grid-cols-3", "gap-6", "mt-12");

  Object.values(featureCards).forEach(card => {
    container.insertAdjacentHTML("beforeend", generateFeatureCardHTML(card));
  });
}


// ==== 3. Swiper Slider для портфолио ====
function initSwiper(portfolioImages) {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  // Очистка старых слайдов
  swiperWrapper.innerHTML = '';

  // Добавляем изображения как слайды
  portfolioImages.forEach(imgSrc => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<img src="${imgSrc}" alt="Portfolio Slide" class="w-full h-auto object-cover rounded-lg">`;
    swiperWrapper.appendChild(slide);
  });

  // Инициализация Swiper
  new Swiper('.mySwiper', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1.2,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: { slidesPerView: 1.5 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 2.5 },
    }
  });
}


// ==== 4. Запуск при загрузке страницы ====
document.addEventListener("DOMContentLoaded", () => {
  insertCandidateCard("candidate-card-container", "card_1");
  renderFeatureCards("feature-cards-container");

  const cardData = getCardData("card_1");
  if (cardData && cardData.portfolioImages.length > 0) {
    initSwiper(cardData.portfolioImages);
  }
});