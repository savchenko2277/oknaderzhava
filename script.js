document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');

    let lastScrollTop = 0;
    const hideThreshold = 50;

    // 1. Скрытие top-bar при скролле
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > hideThreshold) {
            header.classList.add('header--hidden');
        } else {
            header.classList.remove('header--hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // 2. Открытие/закрытие бургер-меню
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('burger--active');
        navMenu.classList.toggle('nav--active');

        document.body.style.overflow = navMenu.classList.contains('nav--active') ? 'hidden' : '';
    });

    // 3. Аккордеон для мобильного меню (клик по дропдаунам)
    const dropdownItems = document.querySelectorAll('.nav__item--dropdown');

    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav__link');

        link.addEventListener('click', (e) => {
            // Проверяем, мобильное ли сейчас меню открыто
            if (window.innerWidth <= 1024) {
                e.preventDefault(); // Отменяем переход по ссылке-родителю

                // Закрываем другие открытые подменю, если нужно (эффект аккордеона)
                dropdownItems.forEach(id => {
                    if (id !== item) id.classList.remove('nav__item--open');
                });

                // Переключаем текущее
                item.classList.toggle('nav__item--open');
            }
        });
    });

    // Инициализация Swiper для главного баннера
    const heroSlider = new Swiper('.heroSlider', {
        loop: true, // Зацикливаем слайды
        speed: 800, // Скорость перелистывания
        effect: 'fade', // Плавное исчезновение/появление (опционально, для баннеров смотрится круто)
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.id-next',
            prevEl: '.id-prev',
        },
        autoplay: {
            delay: 5000, // Автопрокрутка каждые 5 сек
            disableOnInteraction: false,
        },
    });

    const reviewsSwiper = new Swiper('.reviews-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        // Навигация кнопками 32x32
        navigation: {
            nextEl: '.reviews__arrow--next',
            prevEl: '.reviews__arrow--prev',
        },
        // Адаптивные брейкпоинты
        breakpoints: {
            576: {
                slidesPerView: 1.5,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    const articlesSwiper = new Swiper('.articles-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false, /* Статьи лучше оставить без бесконечного loop, чтобы корректно отрабатывал конец списка */
        navigation: {
            nextEl: '.articles__arrow--next',
            prevEl: '.articles__arrow--prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 1.5,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });
});