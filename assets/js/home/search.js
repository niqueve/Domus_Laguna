let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
const searchConteiner = document.getElementById('searchConteiner');

//-------------------------------------------------------caso não haja favoritos selecionados
if (favoritos.lenhth === 0){
    for (let i = 0; i < 4; i++) {
        if(i===0){
            searchConteiner.innerHTML +=
             `
            <div>
                <img scr='assets/images/download.jpeg'/>
            </div>
            `
        }else{
            searchConteiner.innerHTML +=
             `
            <div>
                <img scr='assets/images/download(${i}).jpeg'/>
            </div>
            `
        }
    }
}

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

function criarDivResidencia (favorito){
    return ``
}

function imgFavoritos (dados){
    favoritos.forEach(bairro => {
        
    });
}