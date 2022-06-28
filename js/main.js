/*Самовызывающая функция, которая отрабатывает как только распарсится джава-скрипт документ*/
(function() {
    /*получаем элемент для работы - хедер*/
    const header = document.querySelector('.header');
    window.onscroll = () => {
        /*При скролинге страницы больше 50 пикселей выполняется функция:*/
        if (window.pageYOffset > 50) {
            /*При выполнении условия хедеру передаестся класс header_active, описанный в style.css */
            header.classList.add('header_active');
        } else {
            /**иначе - убираем назначенный класс */
            header.classList.remove('header_active');
        }
    };
})();

// Burger handler
(function() {
    /*при щелчке на бюргер выезжает меню  для мобильной версии*/
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header_nav');
    const menuCloseItem = document.querySelector('.header_nav_close');
    const menuLinks = document.querySelectorAll('.header_link');
    burgerItem.addEventListener('click', () => {
        menu.classList.add('header_nav_active');
    });
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header_nav_active');
    });
    /**Скрывать меню после выбора ссылки при размере экрана 767px */
    if (window.innerWidth <= 767) {
        for (let i = 0; i < menuLinks.length; i += 1) {
            menuLinks[i].addEventListener('click', () => {
                menu.classList.remove('header_nav_active');
            });
        }
    }
})();

/* Скроллинг */
// Scroll to anchors
(function() {
    /*Функция плавный скролл*/

    const smoothScroll = function(targetEl, duration) {
        /*Получаем высоту хедера для регулировки расстояния скролинга до блока, до которого происходит скролл, чтобы хедер не наезжал на контент при фиксации своей позиции  */
        const headerElHeight = document.querySelector('.header').clientHeight;
        /*Получаем селектор пункта меню, для которого делается скролл */
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
        /*Функция обработчик скрола */
        const ease = function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        };
        /** Функция анимации */
        const animation = function(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };
    /**Подвешивание обработчика события на ссылки в меню */

    const scrollTo = function() {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function() {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
})();