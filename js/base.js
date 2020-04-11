// Главная функция / Main function
window.onload = function() {
    setTimeout(function(){
        document.body.classList.add('animated');
    }, 1500);
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');

    // Слайдер услуг на главной / Services slider on index page
    services();

    // Бинд для попап окон. Первая переменная - кнопка-триггер, вторая переменная - класс нужного попапа !! Для работоспособности важно сохранить html-структуру попап окна !! / Popup bind. First var - btn-trigger, second var - class of popup !! To keep this function working use default html-structure of popup !!
    bindModal('.call-fb', '.popup-fb');

    // Бинд мобильного меню / Mobile menu bind
    mobileMenuBind();

    // Скрывание переключения режима света
    if (document.querySelector('.switch-light'))
    {
        setTimeout(() => {
            document.querySelector('.switch-light').classList.add('hidden');
        }, 60000);
    }

    // Субменю
    if (document.querySelector('.submenu-tgl'))
    {
        document.querySelector('.submenu-tgl').addEventListener('click', function() {
            document.querySelector('.header-nav').classList.add('pre-submenu');
            setTimeout(function() {
                document.querySelector('.header-nav').classList.add('before-submenu');
            }, 300);
            setTimeout(function() {
                document.querySelector('.header-nav').classList.add('submenu');
            }, 310);
        });
    }

    // переключение темы сайта
    const dmode = window.localStorage.getItem('dmode', '');
    const modeSwtch = document.querySelector('.switch-light');
    const dModeStyles = document.querySelector('#darkModeStyleSheet');

    if (localStorage.dmode == 'true')
    {
        dModeStyles.removeAttribute('disabled');
    } else {
        dModeStyles.setAttribute('disabled', true);
    }

    if (document.querySelector('.switch-light'))
    {
        modeSwtch.addEventListener('click', (e) => {
            e.preventDefault();
            if (dModeStyles.hasAttribute('disabled')) {
                dModeStyles.removeAttribute('disabled');
                window.localStorage.setItem('dmode', true);
            } else {
                dModeStyles.setAttribute('disabled', true);
                window.localStorage.setItem('dmode', false);
            }
        });
    }

});

// Модули / Modules
const services = () => {
    if (document.querySelector('.services-nav-list__item'))
    {
        const servicesNav = Array.from(document.querySelectorAll('.services-nav-list__item'));
        const servicesSliders = Array.from(document.querySelectorAll('.services-slider__item'));
        servicesSliders[0].style.display = 'block';
        servicesSliders[0].classList.add('current');
        servicesNav.forEach(item => {
            item.addEventListener('click', () => {
                servicesSliders.forEach(slider => {
                    slider.classList.remove('current');
                    setTimeout(() => {slider.style.display = 'none';}, 300);
                });
                let index = servicesNav.indexOf(item);
                setTimeout( () => {
                    servicesSliders[index].style.display = 'block';
                    setTimeout(() => {servicesSliders[index].classList.add('current');}, 100);
                }, 300);
            });
        });
    }
};

const bindModal = (trigger, modalClass) => {
    if (document.querySelector(trigger))
    {
        const triggerBtns = document.querySelectorAll(trigger);
        const $modal = document.querySelector(modalClass);
        const $overlay = document.querySelector('.overlay');
        const closeBtns = document.querySelectorAll('.popup-close');

        triggerBtns.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                $overlay.style.zIndex = '9999';
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    $overlay.classList.add('opened');
                    $modal.classList.add('animated');
                }, 0);
            });
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                $overlay.classList.remove('opened');
                $modal.classList.remove('animated');
                setTimeout(() => {
                    $overlay.style.zIndex = '';
                    document.body.style.overflow = '';
                }, 300);
            });
        });
    }

};

const mobileMenuBind = () => {
    const mobileTgls = document.querySelectorAll('.mobile-menu-tgl');
    const $body = document.body;
    mobileTgls.forEach(key => {
        key.addEventListener('click', (e) => {
            e.preventDefault();
            $body.classList.toggle('mobile-opened');
            if ($body.classList.contains('mobile-opened'))
            {
                $body.style.overflow = 'hidden';
            } else {
                $body.style.overflow = '';
            }
        });
    });
};

// ajax form
$(function() {
    document.querySelector('.popup-form').addEventListener('submit', function(evt){
      var http = new XMLHttpRequest(), f = this;
      var th = $(this);
      const $modal = document.querySelector('.popup');
      const $overlay = document.querySelector('.overlay');
      evt.preventDefault();
      http.open("POST", "./mailer.php", true);
      http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
          alert(http.responseText);
          $overlay.classList.remove('opened');
            $modal.classList.remove('animated');
            setTimeout(() => {
                $overlay.style.zIndex = '';
                document.body.style.overflow = '';
          }, 300);
          if (http.responseText.indexOf(f.nameFF.value) == 0) { // очистить поля формы, если в ответе первым словом будет имя отправителя (nameFF)
            th.trigger("reset");
          }
        }
      }
      http.onerror = function() {
        alert('Ошибка, попробуйте еще раз');
        $overlay.classList.remove('opened');
        $modal.classList.remove('animated');
        setTimeout(() => {
            $overlay.style.zIndex = '';
            document.body.style.overflow = '';
        }, 300);
      }
      http.send(new FormData(f));
    }, false);
   
  });