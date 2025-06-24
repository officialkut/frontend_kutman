// ==== 1. Карточка кандидата ====
const cards = {
  card_1: {
    title: "Pristia Candra",
    subtitle: "Senior Product Designer",
    location: "Los Angeles, USA",
    tags: ["Figma", "UI Design", "UX Design"],
    about: "Hi, I’m a final year student completing a bachelor’s In information Technology in QUT, with experience. We are the company behind the wildly successful DIY channel 5-Minute Crafts, the inspirational and creative channel Bright Side.",
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
  container.classList.add("grid", "grid-cols-1", "md:grid-cols-3", "gap-6", "mt-12");

  Object.values(featureCards).forEach(card => {
    container.insertAdjacentHTML("beforeend", generateFeatureCardHTML(card));
  });
}



// ==== 4. Запуск при загрузке страницы ====
document.addEventListener('DOMContentLoaded', function() {
  renderFeatureCards("feature-cards-container");
  // Данные для карточек (замени на свои реальные данные)
  const candidatesData = [
    {
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
  ];

  // Находим контейнер Swiper
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  
  // Очищаем (на случай дублирования)
  swiperWrapper.innerHTML = '';

  // Создаём слайды с карточками
  candidatesData.forEach(candidate => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    
    // Генерируем карточку через твою функцию
    slide.innerHTML = `
      <div class="candidate-card-container">
        ${generateCardTemplate(candidate)}
        
      </div>
    `;
    
    swiperWrapper.appendChild(slide);

  });

  // Инициализируем Swiper ПОСЛЕ генерации слайдов
  const swiper = new Swiper('.slider-container', {
    // Настройки
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // Автопрокрутка (опционально)
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Основные элементы
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('formModal');
  
  // Элементы могут быть null, поэтому добавляем проверки
  if (!form || !modal) return;
  
  // Кнопки и инпуты
  const dataInputs = form.querySelectorAll('input, textarea, select');
  const openModalBtns = document.querySelectorAll('.header__login');
  const closeModalBtn = modal.querySelector('.exit-button');
  const cancelBtn = modal.querySelector('.cansel-button');

  // Обработка перехода между полями формы по Tab
  dataInputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        const nextIndex = (index + 1) % dataInputs.length;
        dataInputs[nextIndex].focus();
      }
    });
  });

  // Обработка отправки формы
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    try {
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());
      
      console.log('Данные формы:', formObject);
      
      // Здесь можно добавить отправку данных на сервер
      // Например: await fetch('/submit-form', { method: 'POST', body: formData });
      
      closeModal();
      form.reset(); // Очищаем форму после отправки
      
      // Можно показать сообщение об успешной отправке
      alert('Форма успешно отправлена!');
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert('Произошла ошибка при отправке формы');
    }
  });

  // Функция открытия модального окна
  function openModal() {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    // Фокусируем первый инпут при открытии
    const firstInput = form.querySelector('input, textarea, select');
    if (firstInput) firstInput.focus();
  }

  // Функция закрытия модального окна
  function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  // Обработчики открытия модального окна
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // Обработчики закрытия модального окна
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  // Закрытие по клику вне модального окна
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Закрытие по ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Основные элементы для Sign Up формы
  const signUpForm = document.getElementById('signUpForm');
  const signUpModal = document.getElementById('signUpModal');
  
  // Проверяем, существуют ли элементы на странице
  if (!signUpForm || !signUpModal) return;
  
  // Элементы формы (включая все input, textarea, select)
  const signUpInputs = signUpForm.querySelectorAll('input, textarea, select');
  const openSignUpBtns = document.querySelectorAll('.header__signup'); // Кнопки открытия Sign Up формы
  const closeSignUpBtn = signUpModal.querySelector('.exit-button');
  const cancelSignUpBtn = signUpModal.querySelector('.cansel-button');

  // Обработка перехода между полями формы по Tab
  signUpInputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        const nextIndex = (index + 1) % signUpInputs.length;
        signUpInputs[nextIndex].focus();
      }
    });
  });

  // Обработка отправки формы Sign Up
  signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    try {
      const formData = new FormData(signUpForm);
      const formObject = Object.fromEntries(formData.entries());
      
      console.log('Данные регистрации:', formObject);
      
      // Здесь можно добавить валидацию пароля (если есть поле password)
      if (formObject.password && formObject.password.length < 8) {
        alert('Пароль должен содержать минимум 8 символов');
        return;
      }
      
      // Здесь можно добавить проверку совпадения паролей (если есть confirmPassword)
      if (formObject.password && formObject.confirmPassword && 
          formObject.password !== formObject.confirmPassword) {
        alert('Пароли не совпадают');
        return;
      }
      
      // Здесь можно добавить отправку данных на сервер
      // const response = await fetch('/api/signup', { method: 'POST', body: formData });
      
      closeSignUpModal();
      signUpForm.reset();
      
      // Можно показать сообщение об успешной регистрации
      alert('Регистрация прошла успешно!');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Произошла ошибка при регистрации');
    }
  });

  // Функция открытия модального окна Sign Up
  function openSignUpModal() {
    signUpModal.style.display = 'flex';
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    // Фокусируем первый инпут при открытии
    const firstInput = signUpForm.querySelector('input, textarea, select');
    if (firstInput) firstInput.focus();
  }

  // Функция закрытия модального окна Sign Up
  function closeSignUpModal() {
    signUpModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  // Обработчики открытия модального окна Sign Up
  openSignUpBtns.forEach(btn => {
    btn.addEventListener('click', openSignUpModal);
  });

  // Обработчики закрытия модального окна Sign Up
  if (closeSignUpBtn) closeSignUpBtn.addEventListener('click', closeSignUpModal);
  if (cancelSignUpBtn) cancelSignUpBtn.addEventListener('click', closeSignUpModal);

  // Закрытие по клику вне модального окна
  signUpModal.addEventListener('click', (e) => {
    if (e.target === signUpModal) {
      closeSignUpModal();
    }
  });

  // Закрытие по ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && signUpModal.style.display === 'flex') {
      closeSignUpModal();
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');
  
  // Минимальное время показа прелоадера (в миллисекундах)
  const minLoaderTime = 1000;
  
  // Время начала загрузки
  const loadStartTime = Date.now();
  
  // Функция скрытия прелоадера
  function hidePreloader() {
    // Вычисляем оставшееся время для минимальной задержки
    const loadTime = Date.now() - loadStartTime;
    const remainingTime = Math.max(0, minLoaderTime - loadTime);
    
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500); // Совпадает с временем transition в CSS
    }, remainingTime);
  }
  
  // Проверяем, полностью ли загружена страница
  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
    
    // На всякий случай скрываем прелоадер через 5 секунд
    setTimeout(hidePreloader, 5000);
  }
});