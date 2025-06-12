//------------------------------------------------------ Recupera favoritos com proteção
let favoritos = [];
try {
    favoritos = JSON.parse(localStorage.getItem('markersFavoritos')) || [];
} catch (e) {
    console.warn('Erro ao carregar favoritos do localStorage:', e);
    favoritos = [];
}

const Conteiner = document.getElementById('carrossel');

//------------------------------------------------------ Função para buscar dados JSON
async function fetchImoveisJson() {
    try {
        const url = 'assets/json/imoveis.json';
        console.log('Tentando carregar JSON de:', url);
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        let data = await response.json();
        console.log('JSON carregado com sucesso:', data);
        return data;
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        return null; // Retorna null para evitar erros
    }
}

//------------------------------------------------------ Função para obter imagens dos favoritos
function imgFavoritos(dados) {
    let favoritesImg = [];
    if (!dados) return favoritesImg; // proteção extra

    favoritos.forEach(marker => {
        const nomeBairro = marker.title;
        if (dados[nomeBairro]) {
            dados[nomeBairro].forEach(imovel => {
                favoritesImg.push(imovel.imagem);
            });
        } else {
            console.warn(`Bairro "${nomeBairro}" não encontrado no JSON`);
        }
    });

    console.log('Imagens dos favoritos:', favoritesImg);
    return favoritesImg;
}

//------------------------------------------------------ Carregar favoritos na tela
async function favoriteOnload() {
    if (favoritos.length === 0) {
        console.log('Nenhum favorito encontrado. Usando imagens padrão.');
        Conteiner.innerHTML = `
            <img src="assets/images/download (1).jpeg" alt="Imagem padrão 1">
            <img src="assets/images/download (2).jpeg" alt="Imagem padrão 2">
            <img src="assets/images/download.jpeg" alt="Imagem padrão 3">
        `;
        return;
    }

    const dados = await fetchImoveisJson();
    if (!dados) {
        Conteiner.innerHTML = "<p>Erro ao carregar dados dos imóveis.</p>";
        return;
    }

    let favoritosLocal = imgFavoritos(dados);
    localStorage.setItem('favoritesImg', JSON.stringify(favoritosLocal));
}

//------------------------------------------------------ Troca de imagens dinâmicas
function getUnic(imgBairrosFav) {
    let numbersSet = new Set();
    while (numbersSet.size < 3 && numbersSet.size < imgBairrosFav.length) {
        let randomNum = Math.floor(Math.random() * imgBairrosFav.length);
        numbersSet.add(randomNum);
    }
    return Array.from(numbersSet);
}

//------------------------------------------------------ Mostrar imagens na tela
async function changeImg() {
    await favoriteOnload();
    const imgBairrosFav = JSON.parse(localStorage.getItem('favoritesImg')) || [];

    if (imgBairrosFav.length < 3) {
        Conteiner.innerHTML = "<p>Não há imagens suficientes para exibir o carrossel.</p>";
        return;
    }

    let htmlFav = ``;
    let randomSet = getUnic(imgBairrosFav);

    randomSet.forEach(indice => {
        const elemento = imgBairrosFav[indice];
        htmlFav += `<img src="${elemento}" alt="Imagem de residência no bairro favorito">`;
    });

    Conteiner.innerHTML = htmlFav;
}

//------------------------------------------------------ Evento para iniciar
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada, iniciando troca de imagens...");
    changeImg();
});
