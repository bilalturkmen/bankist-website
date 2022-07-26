'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section0 = document.querySelector('#section--0');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const logo = document.querySelector('.logo__link');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Header Button ve Logo scrolling

btnScrollTo.addEventListener('click', function () {
  // butona tıklayınca gideceği bölümü belirtiyoruz
  section1.scrollIntoView({ behavior: 'smooth' });
});

logo.addEventListener('click', function () {
  // Logoya tıklayınca gideceği bölümü belirtiyoruz
  section0.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation scroll

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// menü scroll foreach döngüsü yerine Event delegation yöntemi ile link seçiyoruz. Sayfayı yavşlatmaması için
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

///////////////////////////////////////
// Tab Alanı

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  // tıklanan dışındaki tablarda aktif tab klasını siliyoruz
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  // tıklanan dışındaki tablarda aktif içerik klasını siliyoruz
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // tıklanan taba aktif klasını ekliyoruz
  clicked.classList.add('operations__tab--active');

  // tıklanan tab içeriğine aktif klasını ekliyoruz
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animasyonu ekleme

// Hover efekti için fonksiyonu tanımlıyoruz
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// mouse menü üzerine gelince oluşan olayı fonksiyona bind ediyoruz
nav.addEventListener('mouseover', handleHover.bind(0.5));

// mouse menü üzerinden gidince oluşan olayı fonksiyona bind ediyoruz
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation

const header = document.querySelector('.header');
const stcikyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stcikyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});

headerObserver.observe(header);

/*
const header = document.querySelector('.header');
/// Header alanında div elementi oluşturuyoruz
const message = document.createElement('div');
// message div elementine class ekliyoruz
message.classList.add('cookie-message');
// div elementine html ekliyoruz
message.innerHTML =
  'we use cookie for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it!</button>';

// header alanın son kısmına yerleşmesini belirtiyoruz
header.append(message);
// header.before(message);
// header.after(message);

// Butona tıkladığımızda div elementinin silinmesi sağlıyoruz
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // butona tıklandığında hangi elementi sileceğini belirtiyoruz
    // message.remove();
    message.parentElement.removeChild(message);
  });

*/
