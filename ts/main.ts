// Интерфейсы
interface CandidateCard {
  title: string;
  subtitle: string;
  location: string;
  tags: string[];
  about: string;
  portfolioImages: string[];
  email: string;
  phone: string;
}

interface FeatureCard {
  title: string;
  description: string;
}

interface SwiperCandidate {
  title: string;
  subtitle: string;
  location: string;
  about: string;
  tags: string[];
}

interface AppData {
  candidateCards: Record<string, CandidateCard>;
  featureCards: Record<string, FeatureCard>;
  swiperCandidates: SwiperCandidate[];
}

document.addEventListener("DOMContentLoaded", () => {
  // Локальные данные как fallback
  const localData: AppData = {
    candidateCards: {
      card_1: {
        title: "Pristia Candra",
        subtitle: "Senior Product Designer",
        location: "Los Angeles, USA",
        tags: ["Figma", "UI Design", "UX Design"],
        about:
          "Hi, I'm a final year student completing a bachelor's In information Technology in QUT, with experience. We are the company behind the wildly successful DIY channel 5-Minute Crafts, the inspirational and creative channel Bright Side.",
        portfolioImages: ["images/Fram.png", "images/Fram2.png", "images/Fram3.png"],
        email: "pristia@gmail.com",
        phone: "0809021920139",
      },
    },
    featureCards: {
      card_1: {
        title: "Professional Profile",
        description:
          "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on brefolio to show your best self and get discovered by recruiters.",
      },
      card_2: {
        title: "Best Portfolio",
        description:
          "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on brefolio to show your best self and get discovered by recruiters.",
      },
      card_3: {
        title: "Powerful Resume",
        description:
          "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on brefolio to show your best self and get discovered by recruiters.",
      },
    },
    swiperCandidates: [
      {
        title: "UI/UX Designer",
        subtitle: "Senior Designer",
        location: "San Francisco, CA",
        about: "I design user interfaces and experiences with a focus on accessibility and clean aesthetics.",
        tags: ["Figma", "Adobe XD", "User Research"],
      },
      {
        title: "Frontend Developer",
        subtitle: "Mid-level Developer",
        location: "Remote",
        about: "Specialized in React and Vue.js with 3+ years of commercial experience.",
        tags: ["JavaScript", "React", "CSS"],
      },
      {
        title: "Product Manager",
        subtitle: "Junior PM",
        location: "New York, NY",
        about: "Passionate about building products that solve real user problems.",
        tags: ["Agile", "Scrum", "JIRA"],
      },
    ],
  };

  let appData: AppData = { ...localData };

  // Preloader
  const preloader = document.querySelector(".preloader") as HTMLElement | null;
  if (preloader) {
    preloader.classList.remove("hidden");
  }

  window.addEventListener("load", () => {
    if (preloader) {
      preloader.classList.add("hidden");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }
  });

  // Загрузка данных из JSON
  fetch("data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Не удалось загрузить данные");
      return response.json();
    })
    .then((data: AppData) => {
      if (data.candidateCards && data.featureCards && data.swiperCandidates) {
        appData = data;
      }
      initializeApp();
    })
    .catch((error) => {
      console.error("Ошибка загрузки data.json:", error);
      appData = { ...localData };
      initializeApp();
    });

  // ===================== КАРТОЧКА КАНДИДАТА =====================
  function generateCardTemplate(data: CandidateCard): string {
    const tagBadges = data.tags.map((tag) => `<p class="about__register">${tag}</p>`).join("");
    return `
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
        <div class="mb-4">
          <p class="about__text">About Me</p>
          <p class="about__slogan__text">${data.about}</p>
          <p>Portfolio</p>
          <div class="about__img">
            <img src="${data.portfolioImages[0]}" alt="">
            <img src="${data.portfolioImages[1]}" alt="">
            <img src="${data.portfolioImages[2]}" alt="">        
          </div>
          <p>Work Experience</p>
        </div>
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
              <div class="about__images"><img src="images/call.png" alt=""></div>
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
    `;
  }

  function renderCandidateCard(containerId = "candidate-card-container", cardKey = "card_1"): void {
    const container = document.getElementById(containerId);
    if (!container) return console.error(`Контейнер "${containerId}" не найден`);
    const cardData = appData.candidateCards[cardKey];
    if (!cardData) return console.warn(`Карточка "${cardKey}" не найдена`);
    container.innerHTML = generateCardTemplate(cardData);
  }

  // ===================== ГОРИЗОНТАЛЬНЫЕ КАРТОЧКИ =====================
  function generateFeatureCardHTML(card: FeatureCard): string {
    return `
      <div class="card">
        <h3 class="text-x">${card.title}</h3>
        <p class="text-gray">${card.description}</p>
      </div>
    `;
  }

  function renderFeatureCards(containerId = "feature-cards-container"): void {
    const container = document.getElementById(containerId);
    if (!container) return console.error(`Контейнер "${containerId}" не найден`);
    container.innerHTML = "";
    container.classList.add("grid", "grid-cols-1", "md:grid-cols-3", "gap-6", "mt-12");
    Object.values(appData.featureCards).forEach((card) => {
      container.insertAdjacentHTML("beforeend", generateFeatureCardHTML(card));
    });
  }

  // ===================== SWIPER СЛАЙДЕР =====================
  function initializeSwiper(): void {
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    if (!swiperWrapper) return;
    swiperWrapper.innerHTML = "";

    appData.swiperCandidates.forEach((candidate) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="candidate-card-container">
          ${generateCardTemplate(candidate)}
        </div>
      `;
      swiperWrapper.appendChild(slide);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (window as any).Swiper(".slider-container", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }

  // ===================== МОДАЛЬНЫЕ ФОРМЫ =====================
  function setupModalForms(): void {
    const contactForm = document.getElementById("contactForm") as HTMLFormElement | null;
    const contactModal = document.getElementById("formModal") as HTMLElement | null;
    if (contactForm && contactModal) {
      setupForm(contactForm, contactModal, "contact");
    }

    const signUpForm = document.getElementById("signUpForm") as HTMLFormElement | null;
    const signUpModal = document.getElementById("signUpModal") as HTMLElement | null;
    if (signUpForm && signUpModal) {
      setupForm(signUpForm, signUpModal, "signup");
    }
  }

  function setupForm(
    form: HTMLFormElement,
    modal: HTMLElement,
    type: "contact" | "signup"
  ): void {
    const dataInputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      "input, textarea, select"
    );
    const openModalBtns = document.querySelectorAll(
      type === "contact" ? ".header__login" : ".header__signup"
    );
    const closeModalBtn = modal.querySelector(".exit-button") as HTMLElement | null;
    const cancelBtn = modal.querySelector(".cansel-button") as HTMLElement | null;

    dataInputs.forEach((input, index) => {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          const nextIndex = (index + 1) % dataInputs.length;
          dataInputs[nextIndex].focus();
        }
      });
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        const formData = new FormData(form);
        const formObject: Record<string, string> = {};
        formData.forEach((value, key) => {
          formObject[key] = value.toString();
        });

        console.log(`Данные формы ${type}:`, formObject);

        if (type === "signup") {
          if (formObject.password && formObject.password.length < 8) {
            alert("Пароль должен содержать минимум 8 символов");
            return;
          }
          if (formObject.confirmPassword && formObject.password !== formObject.confirmPassword) {
            alert("Пароли не совпадают");
            return;
          }
        }

        closeModal(modal);
        form.reset();
        alert(`${type === "contact" ? "Форма" : "Регистрация"} успешно отправлена!`);
      } catch (error) {
        console.error(`Ошибка при отправке формы ${type}:`, error);
        alert(`Ошибка при отправке ${type === "contact" ? "формы" : "регистрации"}`);
      }
    });

    openModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => openModal(modal, form));
    });
    if (closeModalBtn) closeModalBtn.addEventListener("click", () => closeModal(modal));
    if (cancelBtn) cancelBtn.addEventListener("click", () => closeModal(modal));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") {
        closeModal(modal);
      }
    });
  }

  function openModal(modal: HTMLElement, form: HTMLFormElement): void {
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
    const firstInput = form.querySelector<HTMLInputElement>("input, textarea, select");
    if (firstInput) firstInput.focus();
  }

  function closeModal(modal: HTMLElement): void {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
  }

  // ===================== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =====================
  function initializeApp(): void {
    renderCandidateCard();
    renderFeatureCards();
    initializeSwiper();
    setupModalForms();
  }
});