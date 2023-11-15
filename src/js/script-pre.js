'use strict';

// MAIN LOGIC
createNavigation();
document.body.className === 'body-art' && readyArtModal();
document.body.className === 'body-web-projects' && createProjColorStyles();
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
        src=${src}
        alt="Logo for Frank Pechar. Abstract. Diagonal angular shapes in perspective from foreground to background.  Dominant color is blue."
      />
    </a>
  </div>

  <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />

  <label for="navi-toggle" class="navigation__button">
    <span class="navigation__icon">&nbsp;</span>
  </label>

  <div class="navigation__background">&nbsp;</div>

  <nav class="navigation__nav">
    <ul class="navigation__list">
      <li class="navigation__item">
        <a href="../html-pages/javascript-projects.html" class="navigation__link"
          >JavaScript Projects</a
        >
      </li>
			<li class="navigation__item">
        <a href="../html-pages/react-projects.html" class="navigation__link"
          >React Projects</a
        >
      </li>
			<li class="navigation__item">
        <a href="../html-pages/css-projects.html" class="navigation__link"
          >CSS Projects</a
        >
      </li>
		  <li class="navigation__item">
        <a href="../html-pages/digital-arts.html" class="navigation__link"
          >Digital Arts</a
        >
      </li>   
      <li class="navigation__item">
        <a href="../html-pages/other-interests.html" class="navigation__link"
          >Other Interests</a
        >
      </li>   
      <li class="navigation__item">
        <a href="../index.html" class="navigation__link">Main Page</a>
      </li>
    </ul>
  </nav>
</div>
`;
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

  images.forEach((image, index) => {
    image.addEventListener('click', () => {
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
    });
  });
}

// COLOR STYLING FUNCTION for PROJECTS PAGE

function createProjColorStyles() {
  const project = document.querySelectorAll('.proj-app__item');

  project.forEach((proj, i, projects) => {
    // const i2 = (i + 1) * 40;
    const i2 = ((i + 1) * 360) / projects.length;
    const i3 = i2 > 180 ? i2 - 180 : i2 + 180;

    proj.children[0].style.backgroundColor = `hsl(${i2}, 35%, 40%)`;
    proj.children[0].children[0].style.color = `hsl(${i2}, 75%, 10%)`;
    proj.children[0].children[1].style.color = `hsl(${i2}, 75%, 10%)`;

    proj.children[1].style.backgroundColor = `hsl(${i2}, 35%, 40%)`;
    proj.children[1].children[0].style.color = `hsl(${i2}, 75%, 10%)`;
    proj.children[1].children[2].style.color = `hsl(${i2}, 75%, 10%)`;
  });
}

// HOME PAGE MENU CHECK SELECTION FROM HTML MENU TRIANGLE ONCLICK EVENT
window.checkNav = function () {
  const checkButton = document.getElementById('navi-toggle');
  checkButton.checked = true;
};
