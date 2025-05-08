const toggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

  toggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });


  const tabButtons = document.querySelectorAll(".tab-btn");
  const formAlugar = document.getElementById("form-alugar");
  const formComprar = document.getElementById("form-comprar");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.getAttribute("data-tab");
      if (tab === "alugar") {
        formAlugar.classList.remove("hidden");
        formComprar.classList.add("hidden");
      } else {
        formAlugar.classList.add("hidden");
        formComprar.classList.remove("hidden");
      }
    });
  });

