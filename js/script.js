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