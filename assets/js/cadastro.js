document.addEventListener('DOMContentLoaded', () => {
    const cadastroBtnDesktop = document.querySelector('.navbar-right > .cadastro-button');
    const cadastroBtnMobile = document.querySelector('#mobile-menu .cadastro-button');
    const mobileMenu = document.getElementById("mobile-menu");
    const toggle = document.getElementById("menu-toggle");
  
    const isCadastroPage = window.location.href.includes('cadastro.html');
  
    if (isCadastroPage) {
      if (cadastroBtnDesktop) cadastroBtnDesktop.style.display = 'none';
      if (cadastroBtnMobile) cadastroBtnMobile.style.display = 'none';
    }
  
    toggle?.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      toggle.classList.toggle("active");
    });
  
    
    });
  ;
  