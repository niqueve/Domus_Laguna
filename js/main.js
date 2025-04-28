const menuHamburguer = document.getElementById('menu-hamburguer');
const menu = document.getElementById('menu');

menuHamburguer.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuHamburguer.classList.toggle('active');

    const expanded = menuHamburguer.getAttribute('aria-expanded') === 'true';
    menuHamburguer.setAttribute('aria-expanded', !expanded);
});

const carousel = document.getElementById('carousel');
const images = document.querySelectorAll('#carousel img');
let index = 0;

function nextImage() {
    index = (index + 1) % images.length;
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(nextImage, 3000);

const adicionarFavoritoBtn = document.getElementById('adicionar-favorito');
const mostrarMapaFavoritosBtn = document.getElementById('mostrar-mapa-favoritos');
const mostrarFavoritosListaBtn = document.getElementById('mostrar-favoritos-lista');
const nomeFavoritoInput = document.getElementById('nome-favorito');
const favoritosLista = document.getElementById('lista-favoritos');
const favoritosListaContainer = document.getElementById('favoritos-lista-container');
const map = document.getElementById('map');

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function salvarFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function renderizarFavoritos() {
    favoritosLista.innerHTML = '';
    favoritos.forEach((favorito, index) => {
        const li = document.createElement('li');
        li.textContent = favorito;

        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'Remover';
        removerBtn.classList.add('remover-favorito');
        removerBtn.addEventListener('click', () => {
            favoritos.splice(index, 1);
            salvarFavoritos();
            renderizarFavoritos();
        });

        li.appendChild(removerBtn);
        favoritosLista.appendChild(li);
    });
}

adicionarFavoritoBtn.addEventListener('click', () => {
    const nome = nomeFavoritoInput.value.trim();
    if (nome && !favoritos.includes(nome)) {
        favoritos.push(nome);
        salvarFavoritos();
        renderizarFavoritos();
        nomeFavoritoInput.value = '';
    }
});

mostrarMapaFavoritosBtn.addEventListener('click', () => {
    map.style.display = map.style.display === 'none' ? 'block' : 'none';
});

mostrarFavoritosListaBtn.addEventListener('click', () => {
    favoritosListaContainer.style.display = favoritosListaContainer.style.display === 'none' ? 'block' : 'none';
});

renderizarFavoritos();
