// Шапка

const navButton = document.querySelector('.page-header__menu-button');
const navButtonText = document.querySelectorAll('.page-header__menu-button-open, .page-header__menu-button-close');
const navMenu = document.querySelector('.page-header__navigation');
const navMenuElement = document.querySelectorAll('.page-header__nav-list, .page-header__auth-item, .page-header__socials-list');
const navLogo = document.querySelectorAll('.page-header__logo-regular, .page-header__logo-blue');

document.addEventListener('scroll', () => {
  if (window.pageYOffset > 40 && navMenu.classList.contains('page-header__navigation--closed') && !navMenu.classList.contains('page-header__navigation--scrolled')) {
    navMenu.classList.toggle('page-header__navigation--scrolled');
    navLogo[0].setAttribute('hidden', 'hidden');
    navLogo[1].removeAttribute('hidden', 'hidden');
    navMenuElement[0].classList.toggle('page-header__nav-list--scrolled');
  } else if (window.pageYOffset < 40 && navMenu.classList.contains('page-header__navigation--closed') && navMenu.classList.contains('page-header__navigation--scrolled')) {
    navMenu.classList.remove('page-header__navigation--scrolled');
    navLogo[1].setAttribute('hidden', 'hidden');
    navLogo[0].removeAttribute('hidden', 'hidden');
    navMenuElement[0].classList.remove('page-header__nav-list--scrolled');
  }
})

navButton.addEventListener('click', evt => {
  evt.preventDefault();
  if (!navButton.classList.contains('page-header__menu-button--opened')) {
    console.log('меню открывается');

    navMenu.classList.remove('page-header__navigation--closed');

    if (navLogo[0].getAttribute('hidden') === null && !navMenu.classList.contains('page-header__navigation--scrolled')) {
      console.log(navLogo[0].getAttribute('hidden'));
      console.log(navLogo[1].getAttribute('hidden'));

      navLogo[0].setAttribute('hidden', 'hidden');
      navLogo[1].removeAttribute('hidden', 'hidden');
    }

    navButton.classList.toggle('page-header__menu-button--opened');
    navButtonText[0].setAttribute('hidden', 'hidden');
    navButtonText[1].removeAttribute('hidden', 'hidden');

    navMenuElement.forEach(element => {
      // element.classList.remove('page-header__menu-element--closed');
      if (element.classList.contains('page-header__nav-list')) {
        element.classList.remove('page-header__nav-list--closed')
      }
      if (element.classList.contains('page-header__auth-item')) {
        element.classList.remove('page-header__auth-item--closed')
      }
      if (element.classList.contains('page-header__socials-list')) {
        element.classList.remove('page-header__socials-list--closed')
      }
    });
  } else {
    console.log('меню закрывается');

    navMenu.classList.toggle('page-header__navigation--closed');

    if (navLogo[1].getAttribute('hidden') === null && !navMenu.classList.contains('page-header__navigation--scrolled')) {
      console.log(navLogo[0].getAttribute('hidden'));
      console.log(navLogo[1].getAttribute('hidden'));

      navLogo[1].setAttribute('hidden', 'hidden');
      navLogo[0].removeAttribute('hidden', 'hidden');
    }

    navButton.classList.remove('page-header__menu-button--opened');
    navButtonText[1].setAttribute('hidden', 'hidden');
    navButtonText[0].removeAttribute('hidden', 'hidden');

    navMenuElement.forEach(element => {
      // element.classList.toggle('page-header__menu-element--closed');
      if (element.classList.contains('page-header__nav-list')) {
        element.classList.toggle('page-header__nav-list--closed')
      }
      if (element.classList.contains('page-header__auth-item')) {
        element.classList.toggle('page-header__auth-item--closed')
      }
      if (element.classList.contains('page-header__socials-list')) {
        element.classList.toggle('page-header__socials-list--closed')
      }
    });
  }
});

// Тарифы для бизнеса

const businessRatesShowBtn = document.querySelector('.profile-rates__business-rates-link');
const businessRatesCloseBtn = document.querySelector('.profile-rates__business-close-button');
const businessRates = document.querySelector('.profile-rates__business-popup');


businessRatesShowBtn.addEventListener('click', evt => {
  evt.preventDefault();
  if (!businessRates.classList.contains('profile-rates__business-popup--show')) {
    businessRates.classList.toggle('profile-rates__business-popup--show');
  }
});

businessRatesCloseBtn.addEventListener('click', evt => {
  evt.preventDefault();
  if (businessRates.classList.contains('profile-rates__business-popup--show')) {
    businessRates.classList.remove('profile-rates__business-popup--show');
  }
});

document.addEventListener('keyup', evt => {
  if (evt.code === 'Escape') {
    evt.preventDefault();
    if (businessRates.classList.contains('profile-rates__business-popup--show')) {
      businessRates.classList.remove('profile-rates__business-popup--show');
    }
  }
});
