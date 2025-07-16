document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.getElementById('navbar');

  if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('show');
    });
  }
});
