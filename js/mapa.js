document.addEventListener("DOMContentLoaded", () => {
    const carrossel = document.getElementById('carousel');
    const mapaContainer = document.getElementById('map');

    async function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -22.93592061, lng: -42.8249576 },
            zoom: 12,
        });

        // Criar o botão para alternar entre mapa e carrossel
        const botaoToggle = document.createElement('button');
        botaoToggle.textContent = 'Fechar Mapa';
        botaoToggle.style.position = 'absolute';
        botaoToggle.style.bottom = '10px'; 
        botaoToggle.style.left = '50%'; 
        botaoToggle.style.transform = 'translateX(-50%)'; 
        botaoToggle.style.padding = '10px';
        botaoToggle.style.backgroundColor = '#fff';
        botaoToggle.style.border = '1px solid #ccc';
        botaoToggle.style.borderRadius = '5px'; 
        botaoToggle.style.cursor = 'pointer';
        botaoToggle.style.zIndex = '1000'; // Garante que o botão fique visível sobre o mapa

        botaoToggle.addEventListener('click', () => {
            // Alternar para aparecer o carrossel e ocultar o mapa
            mapaContainer.style.display = 'none';
            carrossel.style.display = 'flex';
        });

        // Adicionar o botão ao contêiner do mapa
        mapaContainer.appendChild(botaoToggle);
    }

    const botaoAdicionarFavoritos = document.getElementById('adicionar-favorito');
    botaoAdicionarFavoritos.addEventListener('click', async () => {
        carrossel.style.display = 'none';
        mapaContainer.style.display = 'flex';

        // Inicializar o mapa
        await initMap();
    });
});
