// ==== 1. Карточка кандидата ====
const cards = {
  card_1: {
    title: "Pristia Candra",
    subtitle: "Senior Product Designer",
    location: "Los Angeles, USA",
    tags: ["Figma", "UI Design", "UX Design"],
    about: "Hi, I’m a final year student completing a bachelor’s Innformation Technology in QUT,withexperience. We are the company behind the wildly successful DIY channel 5-Minute Crafts, the inspirational and creative channel Bright Side.",
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
  const portfolioImages = data.portfolioImages.map(img => `<img src="${img}" alt="Portfolio">`).join('');

  return `
    <h2 class="about__title">Everything you want to know in one place.</h2>
    <div class="about__wrap">
      <div class="about__wrapper">
        <div class="about__inner">
          <div class="about__inner__war">
            <img class="about__avatar" src="images/Ellipse.png" alt="Profile Picture">
            <p class="about__subject">${data.title}</p>
            <p class="about__caption">${data.subtitle}</p>
            <div class="about__col">
              <p>${data.location}</p>
              <p class="about__slogan">Fulltime Freelancer</p>
            </div>
          </div>
          <div class="about__registertext">
            ${tagBadges}
          </div>
        </div>
        <div>
          <p class="about__text">About Me</p>
          <p class="about__slogan__text">${data.about}</p>
        </div>
        <p class="about__text">Portfolio</p>
        <div class="about__img">
          ${portfolioImages}
        </div>
        <p>Work Experience</p>
        <div class="about__list__item">
          <div class="about__list2">
            <div class="about__conteiners">
              <div class="about__images"><img src="images/sms.png" alt="#"></div>
              <div class="about__email">
                <p class="about__normol">Email</p>
                <p>${data.email}</p>
              </div>
            </div>
            <div class="about__conteiners">
              <div class="about__images"><img src="images/call.png" alt="#"></div>
              <div class="about__email">
                <p class="about__normol">Phone Number</p>
                <p>${data.phone}</p>
              </div>
            </div>
            <div>
              <p class="about__content">Download Resume</p>
              <p class="about__content2">Message</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function insertCard(containerId, cardKey) {
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
    <div class="card">
      <h3 class="text-x">${card.title}</h3>
      <p class="text-gray">${card.description}</p>
    </div>
  `;
}

function renderFeatureCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return console.error(`Container "${containerId}" not found`);

  container.innerHTML = "";
  container.classList.add("flex", "overflow-x-auto", "gap-4", "p-4");

  Object.values(featureCards).forEach(card => {
    container.insertAdjacentHTML("beforeend", generateFeatureCardHTML(card));
  });
}

function enableHorizontalScroll(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.addEventListener("wheel", (e) => {
    e.preventDefault();
    container.scrollLeft += e.deltaY;
  }, { passive: false });
}

// ==== 3. Инициализация при загрузке страницы ====
document.addEventListener("DOMContentLoaded", () => {
  insertCard("cards-container", "card_1");
  renderFeatureCards("card-container");
  enableHorizontalScroll("card-container");
});