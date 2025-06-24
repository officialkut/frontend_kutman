'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // Локальные данные как fallback
  const localData = {
    candidateCards: {
      card_1: {
        title: "Pristia Candra",
        subtitle: "Senior Product Designer",
        location: "Los Angeles, USA",
        tags: ["Figma", "UI Design", "UX Design"],
        about: "Hi, I'm a final year student completing a bachelor's In information Technology in QUT, with experience. We are the company behind the wildly successful DIY channel 5-Minute Crafts, the inspirational and creative channel Bright Side.",
        portfolioImages: [
          "images/Fram.png",
          "images/Fram2.png",
          "images/Fram3.png"
        ],
        email: "pristia@gmail.com",
        phone: "0809021920139"
      }
    },
    featureCards: {
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
    },
    swiperCandidates: [{
        title: "UI/UX Designer",
        subtitle: "Senior Designer",
        location: "San Francisco, CA",
        about: "I design user interfaces and experiences with a focus on accessibility and clean aesthetics.",
        tags: ["Figma", "Adobe XD", "User Research"]
      },
      {
        title: "Frontend Developer",
        subtitle: "Mid-level Developer",
        location: "Remote",
        about: "Specialized in React and Vue.js with 3+ years of commercial experience.",
        tags: ["JavaScript", "React", "CSS"]
      },
      {
        title: "Product Manager",
        subtitle: "Junior PM",
        location: "New York, NY",
        about: "Passionate about building products that solve real user problems.",
        tags: ["Agile", "Scrum", "JIRA"]
      }
    ]
  };

  let appData = {
    ...localData
  };

  // Preloader
  document.querySelector('.preloader').classList.remove('hidden');
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  // ===================== ЗАГРУЗКА ДАННЫХ =====================
  fetch('data.json')
    .then(response => {
      if (!response.ok) throw new Error('Не удалось загрузить данные');
      return response.json();
    })
    .then(data => {
      // Проверяем структуру данных
      if (data.candidateCards && data.featureCards && data.swiperCandidates) {
        appData = data;
      }
      initializeApp();
    })
    .catch(error => {
      console.error('Ошибка загрузки data.json:', error);
      appData = {
        ...localData
      };
      initializeApp();
    });

  // ===================== КАРТОЧКА КАНДИДАТА =====================
  function generateCardTemplate(data) {
    const tagBadges = data.tags.map(tag => `<p class="about__register">${tag}</p>`).join('');

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
        <img src="images/Fram.png" alt="">
        <img src="images/Fram2.png" alt="">
        <img src="images/Fram3.png" alt="">        
        </div>
        <p>Work Experience</p>
      </div>
       <div class="about__list__item">
                            <div class="about__list2">
                                <div class="about__conteiners">
                                    <div class="about__images">
                                        <img src="images/sms.png" alt="#">
                                    </div>

                                    <div class="about__email">
                                        <p class="about__normol">Email</p>
                                        <p>pristia@gmail.com</p>
                                    </div>

                                </div>

                                <div class="about__conteiners">
                                    <div class="about__images"><img src="images/call.png" alt=""></div>

                                    <div class="about__email">
                                        <p class="about__normol">Phone Number</p>
                                        <p>0809021920139</p>
                                    </div>

                                </div>
                                <div>
                                    <p class="about__content">Download Resume</p>
                                    <p class="about__content2">Message</p>
                                </div>
                            </div>



                        </div>
  `;
  }


  function renderCandidateCard(containerId = "candidate-card-container", cardKey = "card_1") {
    const container = document.getElementById(containerId);
    if (!container) return console.error(`Контейнер "${containerId}" не найден`);

    const cardData = appData.candidateCards[cardKey];
    if (!cardData) return console.warn(`Карточка "${cardKey}" не найдена`);

    container.innerHTML = generateCardTemplate(cardData);
  }

  // ===================== ГОРИЗОНТАЛЬНЫЕ КАРТОЧКИ =====================
  function generateFeatureCardHTML(card) {
    return `
      <div class="card">
        <h3 class="text-x">${card.title}</h3>
        <p class="text-gray">${card.description}</p>
      </div>
    `;
  }

  function renderFeatureCards(containerId = "feature-cards-container") {
    const container = document.getElementById(containerId);
    if (!container) return console.error(`Контейнер "${containerId}" не найден`);

    container.innerHTML = "";
    container.classList.add("grid", "grid-cols-1", "md:grid-cols-3", "gap-6", "mt-12");

    Object.values(appData.featureCards).forEach(card => {
      container.insertAdjacentHTML("beforeend", generateFeatureCardHTML(card));
    });
  }

  // ===================== SWIPER СЛАЙДЕР =====================
  function initializeSwiper() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (!swiperWrapper) return;

    swiperWrapper.innerHTML = '';

    appData.swiperCandidates.forEach(candidate => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <div class="candidate-card-container">
          ${generateCardTemplate(candidate)}
        </div>
      `;
      swiperWrapper.appendChild(slide);
    });

    const swiper = new Swiper('.slider-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }

  // ===================== МОДАЛЬНЫЕ ФОРМЫ =====================
  function setupModalForms() {
    // Контактная форма
    const contactForm = document.getElementById('contactForm');
    const contactModal = document.getElementById('formModal');

    if (contactForm && contactModal) {
      setupForm(contactForm, contactModal, 'contact');
    }

    // Форма регистрации
    const signUpForm = document.getElementById('signUpForm');
    const signUpModal = document.getElementById('signUpModal');

    if (signUpForm && signUpModal) {
      setupForm(signUpForm, signUpModal, 'signup');
    }
  }

  function setupForm(form, modal, type) {
    const dataInputs = form.querySelectorAll('input, textarea, select');
    const openModalBtns = document.querySelectorAll(type === 'contact' ? '.header__login' : '.header__signup');
    const closeModalBtn = modal.querySelector('.exit-button');
    const cancelBtn = modal.querySelector('.cansel-button');

    // Навигация по Tab
    dataInputs.forEach((input, index) => {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          const nextIndex = (index + 1) % dataInputs.length;
          dataInputs[nextIndex].focus();
        }
      });
    });

    // Отправка формы
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());

        console.log(`Данные формы ${type}:`, formObject);

        // Дополнительная валидация для формы регистрации
        if (type === 'signup') {
          if (formObject.password && formObject.password.length < 8) {
            alert('Пароль должен содержать минимум 8 символов');
            return;
          }

          if (formObject.password && formObject.confirmPassword &&
            formObject.password !== formObject.confirmPassword) {
            alert('Пароли не совпадают');
            return;
          }
        }

        closeModal(modal);
        form.reset();
        alert(`${type === 'contact' ? 'Форма' : 'Регистрация'} успешно отправлена!`);
      } catch (error) {
        console.error(`Ошибка при отправке формы ${type}:`, error);
        alert(`Ошибка при отправке ${type === 'contact' ? 'формы' : 'регистрации'}`);
      }
    });

    // Управление модальным окном
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', () => openModal(modal, form));
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', () => closeModal(modal));
    if (cancelBtn) cancelBtn.addEventListener('click', () => closeModal(modal));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal(modal);
      }
    });
  }

  function openModal(modal, form) {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    const firstInput = form.querySelector('input, textarea, select');
    if (firstInput) firstInput.focus();
  }

  function closeModal(modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  // ===================== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =====================
  function initializeApp() {
    renderCandidateCard();
    renderFeatureCards();
    initializeSwiper();
    setupModalForms();
  }
});