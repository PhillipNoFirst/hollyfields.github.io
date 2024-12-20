// Слайдер

// Получаем элементы слайдера
const slider = document.querySelector('.Slider');
const prevButton = document.querySelector('.PrevButton');
const nextButton = document.querySelector('.NextButton');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener('click', PreviousSlide);
nextButton.addEventListener('click', NextSlide);

// Функция для показа предыдущего слайда
function PreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Функция для показа следующего слайда
function NextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Инициализация слайдера
updateSlider()

//Автоматическая смена слайда раз в 10 секунд
setInterval(NextSlide,10*1000); 