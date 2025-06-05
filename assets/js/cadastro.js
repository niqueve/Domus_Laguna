document.addEventListener("DOMContentLoaded", () => {
  const btnComprador = document.getElementById("btn-comprador");
  const btnVendedor = document.getElementById("btn-vendedor");
  const formComprador = document.getElementById("form-comprador");
  const formVendedor = document.getElementById("form-vendedor");

  btnComprador.addEventListener("click", () => {
    btnComprador.classList.add("active");
    btnVendedor.classList.remove("active");
    formComprador.classList.add("active");
    formVendedor.classList.remove("active");
  });

  btnVendedor.addEventListener("click", () => {
    btnVendedor.classList.add("active");
    btnComprador.classList.remove("active");
    formVendedor.classList.add("active");
    formComprador.classList.remove("active");
  });

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
});
