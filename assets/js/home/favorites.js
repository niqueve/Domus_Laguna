document.addEventListener("DOMContentLoaded", function () {
    const favoritosContainer = document.getElementById('favorites-container'); // Elemento onde os favoritos serão exibidos
    const bairrosFavoritos = JSON.parse(localStorage.getItem('markersFavoritos')) || [];

    if (bairrosFavoritos.length === 0) {
        favoritosContainer.innerHTML = '<p>Nenhum favorito selecionado.</p>';
        return;
    }

    // Carrega os dados do arquivo JSON
    fetch('assets/json/imoveis.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do JSON.');
            }
            return response.json();
        })
        .then(data => {
            bairrosFavoritos.forEach(marker => {
                const bairro = marker.title; // Nome do bairro do marcador
                if (data[bairro]) {
                    const bairroDiv = document.createElement('div');
                    bairroDiv.className = 'bairro';
                    bairroDiv.innerHTML = `<div class = "bairro-name"><h2>${bairro}</h2></div>`;

                    // Adiciona os imóveis relacionados ao bairro
                    data[bairro].forEach(imovel => {
                        const imovelDiv = document.createElement('div');
                        imovelDiv.className = 'imovel';

                        imovelDiv.innerHTML = `
                            <div class="imovel-image">
                                <img src="${imovel.imagem}" alt="${imovel.tipo}" style="width: 100%; max-width: 300px;">
                            </div>
                            <div class="imovel-description">
                                <h3>${imovel.tipo} - R$${imovel.preco.toLocaleString()}</h3>
                                <p>${imovel.descricao}</p>
                            </div>
                        `;

                        bairroDiv.appendChild(imovelDiv);
                    });

                    favoritosContainer.appendChild(bairroDiv);
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
            favoritosContainer.innerHTML = '<p>Erro ao carregar os favoritos.</p>';
        });
});
