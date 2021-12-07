'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('.section');
const navLinks = document.querySelector('.nav__links');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  // const section1Coord = section1.getBoundingClientRect();
  // window.scrollTo({
  //   top: section1Coord.y + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  console.log(section1);
  section1.scrollIntoView({ behavior: 'smooth' });
});

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  let select;
  if (e.target.classList.contains('nav__link')) {
    select = document.querySelector(e.target.getAttribute('href'));
  }
  select.scrollIntoView({ behavior: 'smooth' });
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) {
    return;
  }
  tabs.forEach(function (item) {
    item.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(function (item) {
    item.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

nav.addEventListener('mouseover', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const obj = e.target.parentElement.parentElement.children;
    const arr = Array.from(obj);
    arr.forEach(function (link) {
      if (e.target.parentElement !== link) {
        link.style.opacity = '0.5';
      }
    });
  }
});
nav.addEventListener('mouseout', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const obj = e.target.parentElement.parentElement.children;
    const arr = Array.from(obj);
    arr.forEach(function (link) {
      if (e.target.parentElement !== link) {
        link.style.opacity = '1';
      }
    });
  }
});

//------------------------SCROLL EVENT STICKY NAVBAR---------------------------
// window.addEventListener('scroll', function () {
//   if (scrollY == 0) {
//     nav.classList.remove('sticky');
//   } else {
//     nav.classList.add('sticky');
//   }
// });
//------------------------SCROLL EVENT STICKY NAVBAR---------------------------

//-----------------------------------OBSERVE-NAVBAR-----------------------------
const navCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      nav.classList.add('sticky');
      if (!entry.isIntersecting) return;
    } else {
      nav.classList.remove('sticky');
    }
    observer.unobserve(nav);
  });
};
const navOptions = {
  root: null,
  threshold: 0.1,
};
const sectionOne = document.querySelector('#section--1');
const navObserver = new IntersectionObserver(navCallback, navOptions);
navObserver.observe(sectionOne);
//-----------------------------------OBSERVE-NAVBAR-----------------------------

//-----------------------------------OBSERVE-SECTIONS---------------------------
//Observe yapılacak bölümleri seç
const allSections = document.querySelectorAll('.section');

//fonksiyonu tanıma
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

//Observer'ı tanımla
const selectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

//Observe yaptır. foreach ile tümüne yaptır
allSections.forEach(function (section) {
  selectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//-----------------------------------OBSERVE-SECTIONS---------------------------

//------------------------------------OBSERVE-IMG-------------------------------

const images = document.querySelectorAll('img');
const imgCallBack = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('lazy-img');
    observer.unobserve(entry.target);
  });
};
const options = { root: null, threshold: 0.1 };
const imgObserver = new IntersectionObserver(imgCallBack, options);
images.forEach(img => {
  console.log(img);
  if (img.classList.contains('lazy-img')) {
    imgObserver.observe(img);
    console.log(img);
  }
});
//------------------------------------OBSERVE-IMG-------------------------------

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
