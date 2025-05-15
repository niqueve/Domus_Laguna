let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
const searchConteiner = document.getElementById('searchConteiner');

function fetchImoveisJson (){
    fetch('imoveis.json')
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

function criarDivResidencia (favorito){
    return ``
}

function imgFavoritos (dados){
    favoritos.forEach(bairro => {
        
    });
}