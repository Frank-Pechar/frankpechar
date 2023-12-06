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
    <div class="logo" tabindex="9">
      <a href="../index.html"> 
        <img
          class="logo__img"
          src=${src}
          aria-label="Home Page" 
          alt="Logo for Frank Pechar. Abstract. Diagonal angular shapes in perspective from foreground to background.  Dominant color is blue."
        />
      </a>
    </div>  

    <input type="checkbox" class="navigation__checkbox" role="button" aria-expanded="false" id="navi-toggle"/>

    <label for="navi-toggle"     
      class="navigation__button" role="button" aria-label="Main Hamburger Navigation" aria-controls='navigation-list' aria-expanded="false" tabindex="1" >
      <span class="navigation__icon" role="button" aria-expanded="false">&nbsp;</span>
    </label>

    <div class="navigation__background">&nbsp;</div>

    <nav id='navigation-list' class="navigation__nav">
      <ul class="navigation__list">
        <li class="navigation__item">
          <a href="../html-pages/javascript-projects.html" class="navigation__link" tabindex="2"
            >JavaScript Projects</a
          >
        </li>
        <li class="navigation__item">
          <a href="../html-pages/react-projects.html" class="navigation__link" tabindex="3"
            >React Projects</a
          >
        </li>
        <li class="navigation__item">
          <a href="../html-pages/css-projects.html" class="navigation__link" tabindex="4"
            >CSS Projects</a
          >
        </li>
        <li class="navigation__item">
          <a href="../html-pages/digital-arts.html" class="navigation__link" tabindex="5"
            >Digital Arts</a
          >
        </li>   
        <li class="navigation__item">
          <a href="../html-pages/other-interests.html" class="navigation__link" tabindex="6"
            >Other Interests</a
          >
        </li>   
        <li class="navigation__item">
          <a href="../index.html" class="navigation__link" tabindex="7">Home Page</a>
        </li>
      </ul>
    </nav>
  </div>
  `;

  //   const navToggle = document.getElementById('navi-toggle');
  //   navToggle.setAttribute('aria-expanded', 'false');
  //   navToggle.onclick = function () {
  //     if (this.getAttribute('aria-expanded') == 'false') {
  //       this.setAttribute('aria-expanded', 'true');
  //     } else {
  //       this.setAttribute('aria-expanded', 'false');
  //     }
  //   };
}

// MODAL CREATION FUNCTION for ART PAGES

function readyArtModal() {
  const modal = document.querySelector('.modal');

  modal.innerHTML = `    
  <div class="modalContent">
    <img src="" class="modalImg" />
    <span class="modalTxt"></span>
    <div class="modalNav">
      <button type="button" class="button prevBtn">&#8592;</button>
      <button type="button" class="button nextBtn">&#8594;</button>
      <button class="close">&times;</button>
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

  function animate(i) {
    modalImg.src = images[i].src;
    modalImg.style.animationName = 'fadeInImg';
    modalImg.addEventListener('animationend', onAnimationEnd);
  }

  function imageSliderHandler(image, index) {
    modalImg.src = image.src;
    modal.classList.add('appear');
    modalImg.style.animationName = 'fadeInImg';
    modalImg.addEventListener('animationend', onAnimationEnd);
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
    });

    function nextImg() {
      animate(next);
      next++;
      prev = next - 2;
    }

    function prevImg() {
      animate(prev);
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

// HAMBURGER MENU FUNCTIONALITY WITH ARIA ACCESSIBILITY

const checkButton = document.getElementById('navi-toggle');
const navButton = document.querySelector('.navigation__button');
const navIcon = document.querySelector('.navigation__icon');

document.querySelector('.logo').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.code === 'Space') {
    e.preventDefault();
    window.location.replace('../index.html');
  }
});

window.checkNav = function () {
  checkButton.checked = true;
  navButton.setAttribute('aria-expanded', 'true');
  checkButton.setAttribute('aria-expanded', 'true');
  navIcon.setAttribute('aria-expanded', 'true');
};

const menuSelectorHandler = function (e) {
  if (e.key === 'Enter' || e.code === 'Space') {
    e.preventDefault();
    if (checkButton.checked) {
      checkButton.checked = false;
      navButton.setAttribute('aria-expanded', 'false');
      checkButton.setAttribute('aria-expanded', 'false');
      navIcon.setAttribute('aria-expanded', 'false');
    } else {
      checkNav();
    }
  }
};

navButton.addEventListener('keydown', menuSelectorHandler);

// MAIN MENU CHECK SELECTION FROM HTML MENU TRIANGLE
// ALSO LINKS TO HOME PAGE AND JAVASCRIPT PROJECTS PAGE

function addHomepageMenuSelectors() {
  document
    .querySelector('.rounded-triangle--2')
    .addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        menuSelectorHandler(e);
      }
    });

  document
    .querySelector('.rounded-triangle--1')
    .addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        window.location.replace('../html-pages/javascript-projects.html');
      }
    });
}
