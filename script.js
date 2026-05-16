// ANIMATION ON SCROLL

const elements = document.querySelectorAll(
  '.section, .card, .skills span, .project-main, .gallery img, .stat-box, .clean-project-card'
);

if (elements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.15
  });

  elements.forEach(element => {
    element.classList.add('hidden');
    observer.observe(element);
  });
}


// NAVBAR EFFECT

const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('active-nav');
    } else {
      navbar.classList.remove('active-nav');
    }
  });
}


// LOADER

const loader = document.getElementById('loader');

if (loader) {
  setTimeout(() => {
    loader.classList.add('hide-loader');
  }, 1800);
}


// CUSTOM CURSOR

const cursor = document.querySelector('.cursor');

if (cursor) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}


// TYPING EFFECT

const typingElement = document.querySelector('.typing-text');

if (typingElement) {
  const text = "Assets Management Specialist";
  let index = 0;

  function typeText() {
    if (index < text.length) {
      typingElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeText, 80);
    }
  }

  typeText();
}


// LIGHT / DARK MODE

const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
      themeToggle.textContent = 'Dark Mode';
    } else {
      themeToggle.textContent = 'Light Mode';
    }
  });
}
// PROJECT GALLERY POPUP

const projectGalleryImages =
document.querySelectorAll('.project-page-gallery img');

const projectImagePopup =
document.getElementById('projectImagePopup');

const projectPopupImage =
document.getElementById('projectPopupImage');

const closeProjectImage =
document.querySelector('.close-project-image');

if(projectGalleryImages.length > 0){

    projectGalleryImages.forEach(img => {

        img.addEventListener('click', () => {

            projectImagePopup.classList.add('active');

            projectPopupImage.src = img.src;

        });

    });

}

if(closeProjectImage){

    closeProjectImage.addEventListener('click', () => {

        projectImagePopup.classList.remove('active');

    });

}

if(projectImagePopup){

    projectImagePopup.addEventListener('click', (e) => {

        if(e.target === projectImagePopup){

            projectImagePopup.classList.remove('active');

        }

    });

}
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle && navLinks){

    menuToggle.addEventListener('click', () => {

        navLinks.classList.toggle('active-menu');

    });

}