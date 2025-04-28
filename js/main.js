// Espera o DOM carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Hamburguer ---
    const menuHamburguer = document.getElementById('menu-hamburguer');
    const menu = document.getElementById('menu');

    if (menuHamburguer && menu) {
        menuHamburguer.addEventListener('click', () => {
            menu.classList.toggle('active'); // Alterna a classe 'active' no menu
            const isExpanded = menu.classList.contains('active');
            menuHamburguer.setAttribute('aria-expanded', isExpanded); // Atualiza acessibilidade
            menuHamburguer.classList.toggle('active'); // Adiciona classe ao botão para animação (opcional)
        });

        // Fecha o menu ao clicar em um link (útil em mobile)
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    menuHamburguer.classList.remove('active');
                    menuHamburguer.setAttribute('aria-expanded', 'false');
                }
            });
        });
    } else {
        console.warn("Elementos do menu hamburguer não encontrados.");
    }

    // --- Carrossel de Imagens ---
    const carousel = document.getElementById("carousel");
    const carouselContainer = document.getElementById("carousel-container"); // Container pai
    let images; // Definido depois de verificar se o carrossel existe

    if (carousel) {
        images = carousel.querySelectorAll("img");
        const totalImages = images.length;
        let currentIndex = 0;
        let interval;

        // Função para atualizar a posição do carrossel
        function updateCarousel() {
            if (totalImages > 0) {
                const offset = -currentIndex * 100; // Calcula o deslocamento em %
                carousel.style.transform = `translateX(${offset}%)`;
            }
        }

        // Função para avançar para a próxima imagem
        function nextImage() {
            currentIndex = (currentIndex + 1) % totalImages; // Volta ao início se chegar ao fim
            updateCarousel();
        }

        // Inicia a passagem automática
        function startCarousel() {
            // Limpa intervalo anterior para evitar múltiplos intervalos rodando
            clearInterval(interval);
            if (totalImages > 1) { // Só inicia se houver mais de uma imagem
               interval = setInterval(nextImage, 3000); // Muda a cada 3 segundos
            }
        }

        // Para a passagem automática
        function stopCarousel() {
            clearInterval(interval);
        }

        // Pausa ao passar o mouse sobre o container, retoma ao sair
         if (carouselContainer) {
            carouselContainer.addEventListener("mouseenter", stopCarousel);
            carouselContainer.addEventListener("mouseleave", startCarousel);
         }


        // Inicia o carrossel na carga da página
        startCarousel();
        updateCarousel(); // Define a posição inicial

    } else {
        console.warn("Elemento do carrossel não encontrado.");
    }


    // --- Sistema de Favoritos (usando localStorage) ---
    const adicionarFavoritoBtn = document.getElementById('adicionar-favorito');
    const nomeFavoritoInput = document.getElementById('nome-favorito');
    const mostrarFavoritosListaBtn = document.getElementById('mostrar-favoritos-lista');
    const favoritosLista = document.getElementById('lista-favoritos');
    const favoritosContainer = document.getElementById('favoritos-lista-container');
    const chaveLocalStorage = 'bairrosFavoritos'; // Chave para salvar no localStorage

    // Carrega favoritos salvos ao iniciar
    let favoritos = carregarFavoritos();

    // Função para carregar favoritos do localStorage
    function carregarFavoritos() {
        const favoritosSalvos = localStorage.getItem(chaveLocalStorage);
        return favoritosSalvos ? JSON.parse(favoritosSalvos) : []; // Retorna array vazio se não houver nada salvo
    }

    // Função para salvar favoritos no localStorage
    function salvarFavoritos() {
        localStorage.setItem(chaveLocalStorage, JSON.stringify(favoritos));
    }

    // Função para atualizar a lista de favoritos na tela
    function atualizarListaFavoritosUI() {
        favoritosLista.innerHTML = ''; // Limpa a lista atual
        if (favoritos.length === 0) {
             favoritosContainer.style.display = 'none'; // Esconde se vazia
             return;
        }

        favoritos.forEach((favorito, index) => {
            const li = document.createElement('li');
            li.textContent = favorito;

            // Botão para remover
            const removerBtn = document.createElement('button');
            removerBtn.textContent = 'Remover';
            removerBtn.classList.add('remover-favorito');
            removerBtn.addEventListener('click', () => {
                removerFavorito(index);
            });

            li.appendChild(removerBtn);
            favoritosLista.appendChild(li);
        });
         favoritosContainer.style.display = 'block'; // Mostra a lista
    }

    // Função para adicionar um favorito
    function adicionarFavorito() {
        const nomeFavorito = nomeFavoritoInput.value.trim(); // Remove espaços extras
        if (nomeFavorito && !favoritos.includes(nomeFavorito)) { // Verifica se não está vazio e não é duplicado
            favoritos.push(nomeFavorito);
            salvarFavoritos();
            atualizarListaFavoritosUI();
            nomeFavoritoInput.value = ''; // Limpa o input
            alert(`"${nomeFavorito}" adicionado aos favoritos!`); // Feedback visual
        } else if (favoritos.includes(nomeFavorito)) {
            alert(`"${nomeFavorito}" já está nos seus favoritos.`);
        } else {
            alert("Por favor, digite um nome para o favorito.");
        }
    }

    // Função para remover um favorito pelo índice
    function removerFavorito(index) {
        const favoritoRemovido = favoritos[index];
        favoritos.splice(index, 1); // Remove o item do array
        salvarFavoritos();
        atualizarListaFavoritosUI();
        alert(`"${favoritoRemovido}" removido dos favoritos.`);
    }

    // Event Listeners dos botões de Favoritos
    if (adicionarFavoritoBtn) {
       adicionarFavoritoBtn.addEventListener('click', adicionarFavorito);
    }
     if (mostrarFavoritosListaBtn && favoritosContainer) {
        mostrarFavoritosListaBtn.addEventListener('click', () => {
             // Alterna a visibilidade do container da lista
             const displayAtual = window.getComputedStyle(favoritosContainer).display;
             favoritosContainer.style.display = displayAtual === 'none' ? 'block' : 'none';
             // Atualiza a lista caso itens tenham sido adicionados/removidos enquanto estava oculta
             if(favoritosContainer.style.display === 'block'){
                 atualizarListaFavoritosUI();
             }
        });
     }

    // Inicializa a UI da lista de favoritos ao carregar
    atualizarListaFavoritosUI();


    // --- Controle Mapa / Carrossel ---
    const mapaContainer = document.getElementById('map');
    const mostrarMapaBtn = document.getElementById('mostrar-mapa-favoritos');
    let mapaVisivel = false; // Controla o estado da visualização

    // Verifica se os elementos existem
    if (mostrarMapaBtn && mapaContainer && carouselContainer) {
         mostrarMapaBtn.addEventListener('click', () => {
            mapaVisivel = !mapaVisivel; // Inverte o estado

            if (mapaVisivel) {
                carouselContainer.style.display = 'none'; // Esconde carrossel
                mapaContainer.style.display = 'block'; // Mostra mapa
                mostrarMapaBtn.textContent = 'Ver Carrossel'; // Atualiza texto do botão
                // Inicializa o mapa se ainda não foi inicializado OU
                // Centraliza/atualiza marcadores se já existe
                if (typeof initMap === 'function' && !window.googleMapInstance) { // Verifica se initMap existe e se o mapa não foi criado
                   initMap();
                } else if (window.googleMapInstance) {
                     // Ações futuras: centralizar no favorito, adicionar marcadores, etc.
                     console.log("Mapa já inicializado. Centralizar/atualizar conforme necessário.");
                     // Exemplo: Adicionar marcadores dos favoritos
 
                }
            } else {
                mapaContainer.style.display = 'none'; // Esconde mapa
                carouselContainer.style.display = 'block'; // Mostra carrossel
                mostrarMapaBtn.textContent = 'Ver Mapa/Favoritos'; // Restaura texto do botão
            }
        });
    } else {
        console.warn("Elementos para alternar Mapa/Carrossel não encontrados.");
    }

}); // Fim do DOMContentLoaded


// --- Google Maps ---
// Esta função é chamada pelo callback da API do Google Maps
// Torná-la global para que a API possa chamá-la
let map; // Variável global para a instância do mapa
window.googleMapInstance = null; // Guarda a instância globalmente

async function initMap() {
    // Coordenadas iniciais (ex: centro de Maricá, RJ)
    const initialCoords = { lat: -22.9191, lng: -42.8226 };

     // Verifica se a API do Google Maps está carregada
     if (typeof google === 'object' && typeof google.maps === 'object') {
        try {
             const { Map } = await google.maps.importLibrary("maps"); // Importa a biblioteca de mapas
             const { AdvancedMarkerElement } = await google.maps.importLibrary("marker"); // Para marcadores avançados (opcional)


            map = new Map(document.getElementById("map"), {
                center: initialCoords,
                zoom: 13, // Zoom inicial
                mapId: "DOMUS_LAGUNA_MAP_ID" // Requer um Map ID configurado no Google Cloud Console
            });
            window.googleMapInstance = map; // Armazena a instância globalmente

            // Exemplo: Adicionar um marcador inicial
             new AdvancedMarkerElement({
                 map: map,
                 position: initialCoords,
                 title: "Centro de Maricá (Exemplo)",
             });

            console.log("Mapa inicializado com sucesso.");

             // Se houver favoritos, adiciona marcadores (precisa de geocodificação)
             const favoritosAtuais = JSON.parse(localStorage.getItem('bairrosFavoritos') || '[]');

        } catch (error) {
             console.error("Erro ao inicializar o Google Maps:", error);
             document.getElementById("map").textContent = "Erro ao carregar o mapa. Verifique a chave da API e a conexão.";
        }

     } else {
         console.error("API do Google Maps não carregada.");
          document.getElementById("map").textContent = "Não foi possível carregar a API do Google Maps.";
     }


}
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
        botaoToggle.style.transform = 'translateX(-50%)'; // Ajusta para o centro
        botaoToggle.style.padding = '10px';
        botaoToggle.style.backgroundColor = '#fff';
        botaoToggle.style.border = '1px solid #ccc';
        botaoToggle.style.borderRadius = '5px'; 
        botaoToggle.style.cursor = 'pointer';
        botaoToggle.style.zIndex = '1000'; // Garante que o botão fique visível sobre o mapa

        botaoToggle.addEventListener('click', () => {
            // Alternar para o carrossel e ocultar o mapa
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

