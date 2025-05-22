let favoritos = JSON.parse(localStorage.getItem('markersFavoritos')) || [];
const Conteiner = document.getElementById('carrossel');

//------------------------------------------------------ Função para buscar dados JSON
async function fetchImoveisJson() {
    try {
        let response = await fetch('assets/json/imoveis.json');
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados do JSON.');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        return null; // Retorna null para evitar erros
    }
}

//------------------------------------------------------ Função para obter imagens dos favoritos
function imgFavoritos(dados) {
    let favoritesImg = [];
    favoritos.forEach(marker => {
        const nomeBairro = marker.title;
        if (dados[nomeBairro]) {
            dados[nomeBairro].forEach(imovel => {
                favoritesImg.push(imovel.imagem);
            });
        }
    });
    return favoritesImg;
}

//------------------------------------------------------ Carregar favoritos na tela
async function favoriteOnload() {
    if (favoritos.length === 0) {
        Conteiner.innerHTML =
        `
        <img src="assets/images/download (1).jpeg" alt="Descrição da imagem 1">
        <img src="assets/images/download (2).jpeg" alt="Descrição da imagem 2">
        <img src="assets/images/download.jpeg" alt="Descrição da imagem 3">
        `;
        return;
    }

    const dados = await fetchImoveisJson();
    if (!dados) return; // Se os dados não forem carregados corretamente, evita erros

    let favoritosLocal = imgFavoritos(dados);
    localStorage.setItem('favoritesImg', JSON.stringify(favoritosLocal)); // Salva no localStorage
}

//------------------------------------------------------ Troca de imagens dinâmicas
function getUnic(imgBairrosFav){
    let numbersSet = new Set();
            while (numbersSet.size < 3) {
                let randomNum = Math.floor(Math.random() * imgBairrosFav.length);
                numbersSet.add(randomNum); 
            }return Array.from(numbersSet); // Converte Set para array          
}
//--------------------------------------------random set
async function changeImg() {
    await favoriteOnload();
    const imgBairrosFav = JSON.parse(localStorage.getItem('favoritesImg')) || [];
    let htmlFav = ``;
    let randomSet = getUnic(imgBairrosFav);
    if (imgBairrosFav.length > 0) {
        randomSet.forEach(indice=>{
            const elemento = imgBairrosFav[indice];
            htmlFav += `<img src="${elemento}" alt="Imagem de residencia no bairro favorito">`;
        });
        
    }
    Conteiner.innerHTML = htmlFav;
};

//------------------------------------------------------ Evento para carregar imagens ao iniciar a página
document.addEventListener("DOMContentLoaded", changeImg);
