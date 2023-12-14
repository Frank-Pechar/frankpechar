'use strict';

// MAIN LOGIC for DIFFERENT PAGES
createNavigation();
document.body.classList.contains('digital-arts') && readyArtModal();
document.body.classList.contains('body-web-projects') &&
  createProjColorStyles();
document.body.classList.contains('body-home') && addHomepageMenuSelectors();
// END of MAIN LOGIC

// START of FUNCTION SECTIONS

// NAVIGATION FUNCTION for ALL PAGES

function createNavigation() {
  const nav = document.querySelector('.nav-js');
  const bodyBackground = document.querySelector('.body-background-js');

  if (bodyBackground) {
    bodyBackground.innerHTML = `
    <div class="body-background">
      <div class="universe">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>`;
  }

  const src = '../assets/img/Logo-Frank-Pechar3c.webp';

  nav.innerHTML = `
  <div class="navigation">
    <div class="logo">
      <a href="../index.html"> 
        <img
          class="logo__img"
          tabindex="1000"
          src=${src}
          aria-label="Home Page" 
          alt="Logo for Frank Pechar. Abstract. Diagonal angular shapes in perspective from foreground to background.  Dominant color is blue."
        />
      </a>
    </div>  

    <div
      class="navigation__button">
      <div class="navigation__background">&nbsp;</div>
    </div>
    <div class="navigation__burger" role="button" aria-label="Main Hamburger        Navigation" aria-controls='navigation-list' aria-expanded="false" tabindex="1">
      <span class="navigation__burger-layers">&nbsp;</span>
    </div>

    <nav id='navigation-list' class="navigation__nav">
      <ul class="navigation__list">
        <li class="navigation__item">
          <a href="../html-pages/javascript-projects.html" class="navigation__link" tabindex="40"
            >JavaScript Projects</a
          >
        </li>
        <li class="navigation__item">
          <a href="../html-pages/react-projects.html" class="navigation__link" tabindex="50"
            >React Projects</a
          >
        </li>
        <li class="navigation__item">
          <a href="../html-pages/css-projects.html" class="navigation__link" tabindex="60"
            >CSS Projects</a
          >
        </li>
        <li class="navigation__item">
          <a href="../html-pages/digital-arts.html" class="navigation__link" tabindex="70"
            >Digital Arts</a
          >
        </li>   
        <li class="navigation__item">
          <a href="../html-pages/other-interests.html" class="navigation__link" tabindex="80"
            >Other Interests</a
          >
        </li>   
        <li class="navigation__item">
          <a href="../index.html" class="navigation__link" tabindex="90">Home Page</a>
        </li>
      </ul>
    </nav>

  </div>
  `;

  const navBurger = document.querySelector('.navigation__burger');
  navBurger.focus();
}

// MODAL CREATION FUNCTION for ART PAGES

function readyArtModal() {
  const modal = document.querySelector('.modal');

  modal.innerHTML = `    
  <div class="modalContent" role="alertdialog" aria-modal="true">
    <img src="" class="modalImg" />
    <span class="modalTxt"></span>
    <div class="modalNav">
      <button type="button" class="button prevBtn" aria-label="previous image">&larr;</button>
      <button type="button" class="button nextBtn" aria-label="next image">&rarr;</button>
      <button class="close" aria-label="close">&times;</button>
    </div>
  </div>
`;

  const images = document.querySelectorAll('.card__img-thumb');
  let modalImg = document.querySelector('.modalImg');
  const modalTxt = document.querySelector('.modalTxt');
  const close = document.querySelector('.close');
  const prevBtn = document.querySelector('.prevBtn');
  const nextBtn = document.querySelector('.nextBtn');

  function onAnimationEnd() {
    modalImg.style.animationName = 'none';
  }

  function renderModalImage(image) {
    modalImg.src = image.src;
    modalImg.style.animationName = 'fadeInImg';
    modalImg.role = 'img';
    modalImg.alt = image.alt;
    nextBtn.setAttribute('tabindex', '2');
    prevBtn.setAttribute('tabindex', '3');
    close.setAttribute('tabindex', '4');
    modalImg.addEventListener('animationend', onAnimationEnd);
  }

  function animate(i) {
    renderModalImage(images[i]);
  }

  function imageSliderHandler(image, index) {
    modal.classList.add('appear');
    renderModalImage(image);
    nextBtn.focus();
    let imageIndex = index;
    let next = imageIndex + 1;
    let prev = imageIndex - 1;

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        if (prev < 0) prev = images.length - 1;
        prevImg();
      } else if (e.key === 'ArrowRight') {
        if (next >= images.length) next = 0;
        nextImg();
      } else if (e.key === 'Escape') {
        modal.classList.remove('appear');
      }
    });

    prevBtn.addEventListener('click', () => {
      if (prev < 0) prev = images.length - 1;
      prevImg();
    });

    nextBtn.addEventListener('click', () => {
      if (next >= images.length) next = 0;
      nextImg();
    });

    close.addEventListener('click', () => {
      modal.classList.remove('appear');
      nextBtn.setAttribute('tabindex', '-1');
      prevBtn.setAttribute('tabindex', '-1');
      close.setAttribute('tabindex', '-1');
      const navBurger = document.querySelector('.navigation__burger');
      navBurger.focus();
    });

    function nextImg() {
      animate(next);
      nextBtn.focus();
      next++;
      prev = next - 2;
    }

    function prevImg() {
      animate(prev);
      prevBtn.focus();
      prev--;
      next = prev + 2;
    }
  }

  images.forEach((image, index) => {
    ['click', 'keydown'].forEach((event) => {
      image.addEventListener(event, (e) => {
        if (e.type === 'click' || e.key === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          imageSliderHandler(image, index);
          console.log('testing');
        }
      });
    });
  });
}

// COLOR STYLING FUNCTION for PROJECTS PAGE

function createProjColorStyles() {
  const project = document.querySelectorAll('.proj-app__item');

  project.forEach((proj, i, projects) => {
    const i2 = ((i + 1) * 360) / projects.length;
    const i3 = i2 > 180 ? i2 - 180 : i2 + 180;

    proj.children[0].style.backgroundColor = `hsl(${i2}, 25%, 40%)`;
    proj.children[0].children[0].style.color = `hsl(${i2}, 75%, 10%)`;
    proj.children[0].children[1].style.color = `hsl(${i2}, 75%, 10%)`;

    proj.children[1].style.backgroundColor = `hsl(${i2}, 25%, 40%)`;
    proj.children[1].children[0].style.color = `hsl(${i2}, 75%, 10%)`;
    proj.children[1].children[2].style.color = `hsl(${i2}, 75%, 10%)`;
  });
}

// HAMBURGER MENU FUNCTIONALITY

const navBurger = document.querySelector('.navigation__burger');
const navBurgerLayers = document.querySelector('.navigation__burger-layers');
const navButton = document.querySelector('.navigation__button');
const navList = document.querySelector('.navigation__list');
const navBackground = document.querySelector('.navigation__background');
const navNav = document.querySelector('.navigation__nav');
const roundTriangle1 = document.querySelector('.rounded-triangle--1');
const roundTriangle2 = document.querySelector('.rounded-triangle--2');

document.querySelector('.logo').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.code === 'Space') {
    e.preventDefault();
    window.location.replace('../index.html');
  }
});

window.showNav = function (attr = 'false') {
  navBurger.setAttribute('aria-expanded', attr);
  navBurgerLayers.classList.toggle('selected');
  navList.classList.toggle('show');
  navBackground.classList.toggle('show');
  navNav.classList.toggle('show');
  if (document.body.classList.contains('body-home')) {
    if (attr === 'true') {
      roundTriangle1.setAttribute('tabindex', '-1');
      roundTriangle2.setAttribute('tabindex', '-1');
    } else {
      roundTriangle1.setAttribute('tabindex', '20');
      roundTriangle2.setAttribute('tabindex', '30');
    }
    navBurger.focus();
  }
};

function menuSelectorHandler(e) {
  if (
    e.type === 'click' ||
    e.key === 'Enter' ||
    e.code === 'Space' ||
    e.key === 'Escape'
  ) {
    e.preventDefault();
    if (navBurger.getAttribute('aria-expanded') === 'true') {
      showNav();
    } else {
      showNav('true');
    }
  }
}

navBurger.addEventListener('keydown', menuSelectorHandler);
navBurger.addEventListener('click', menuSelectorHandler);

// MAIN MENU CHECK SELECTION FROM HTML MENU TRIANGLE
// ALSO LINKS TO HOME PAGE AND JAVASCRIPT PROJECTS PAGE

function addHomepageMenuSelectors() {
  const navTriangleButton = document.querySelector('.rounded-triangle--2');

  navTriangleButton.addEventListener('keydown', menuSelectorHandler);
  navTriangleButton.addEventListener('click', menuSelectorHandler);

  document
    .querySelector('.rounded-triangle--1')
    .addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        window.location.replace('../html-pages/javascript-projects.html');
      }
    });

  const h2Home = document.querySelector('.h2-home');
  const h2bHome = document.querySelector('.h2b-home');
  setInterval(swapHomePageMantras, 7000);

  function swapHomePageMantras() {
    h2Home.classList.toggle('display-none');
    h2bHome.classList.toggle('display-none');
  }
}
