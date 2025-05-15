document.addEventListener('DOMContentLoaded', () => {
  const loginBtnDesktop = document.querySelector('.navbar-right > .login-button');
  const loginBtnMobile = document.querySelector('#mobile-menu .login-button');
  const mobileMenu = document.getElementById("mobile-menu");
  const toggle = document.getElementById("menu-toggle");

  const isLoginPage = window.location.href.includes('login.html');

  if (isLoginPage) {
    if (loginBtnDesktop) loginBtnDesktop.style.display = 'none';
    if (loginBtnMobile) loginBtnMobile.style.display = 'none';
  }

  toggle?.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    toggle.classList.toggle("active");
  });

  
  });
;
