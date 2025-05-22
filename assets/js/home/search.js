let favoritos = JSON.parse(localStorage.getItem('markersFavoritos')) || [];
const Conteiner = document.getElementById('carrossel');


//------------------------------------------------------com favoritos selecionados
function fetchImoveisJson (){
    fetch('assets/json/imoveis.json')
        .then(response =>{
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do JSON.');
            }
            return response.json();
        })
        .catch(erro =>{
            console.error('Erro ao carregar os dados:', error);
        });
}

function imgFavoritos (dados){
    let favoritesImg = [];
    favoritos.forEach(marker =>{
                const nomeBairro = marker.title;
                if (dados[nomeBairro]){
                    dados[nomeBairro].forEach(imovel=>{
                        favoritesImg += imovel.imagem;
                    })
                }
            }); return favoritesImg;
}

    
function favoriteOnload (favoritos){
    //-------------------------------------------------------caso não haja favoritos selecionados
    if (favoritos.length === 0){
        Conteiner.innerHTML =
        `
        <img src="assets/images/download (1).jpeg" alt="Descrição da imagem 1">
        <img src="assets/images/download (2).jpeg" alt="Descrição da imagem 2">
        <img src="assets/images/download.jpeg" alt="Descrição da imagem 3">
        `
    }else{
            const dados = fetchImoveisJson();
            let favoritosLocal = imgFavoritos(dados);
            localStorage.setItem('favoritesImg', JSON.stringify(favoritosLocal)); // Salva no localStorage
            
        }

} 

function changeImg (){
    favoriteOnload();
    const imgBairrosFav = JSON.parse(localStorage.getItem('favoritesImg')) || [];
    let htmlFav = ``
    if(imgBairrosFav.length > 0){
        for (let i = 0; i < 4; i++) {
            const indice = Math.floor(Math.random() * imgBairrosFav.length);
            const elemento = imgBairrosFav[indice];
            htmlFav += `<img src=${elemento}>`;
        }
    }Conteiner.innerHTML = htmlFav;
}
document.addEventListener("DOMContentLoaded", changeImg ());




