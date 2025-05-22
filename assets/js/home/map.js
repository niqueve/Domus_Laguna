let map;
let markersFavoritos = [];

async function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -22.93592061, lng: -42.8249576 },
        zoom: 12,
    });
    
    loadFavoritos();

    addMarker({ lat: -22.95, lng: -42.90 }, "Espraiado", false);
    addMarker({ lat: -22.93, lng: -42.82 }, "Centro", false);
}

function addMarker(location, title, isFavorite = false) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: title,
        icon: isFavorite ? 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' : null,
    });

    marker.addListener("click", () => {
        toggleFavorito(marker);
        atualizarFavoritos();
    });

    return marker;
}

function toggleFavorito(marker) {
    const index = markersFavoritos.findIndex(favMarker => favMarker === marker);

    if (index === -1) {
        markersFavoritos.push(marker);
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
        console.log(`Marcador "${marker.getTitle()}" adicionado aos favoritos.`);
    } else {
        markersFavoritos.splice(index, 1);
        marker.setIcon(null);
        console.log(`Marcador "${marker.getTitle()}" removido dos favoritos.`);
    }
    
    salvarFavoritos();
}

function salvarFavoritos() {
    const favoritos = markersFavoritos.map(marker => ({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
        title: marker.getTitle(),
    }));
    localStorage.setItem('markersFavoritos', JSON.stringify(favoritos)); // Salva no localStorage
}

function loadFavoritos() {
    const storedFavoritos = localStorage.getItem('markersFavoritos');
    if (storedFavoritos) {
        const favoritosData = JSON.parse(storedFavoritos);
        favoritosData.forEach(data => {
            const marker = addMarker({ lat: data.lat, lng: data.lng }, data.title, true);
            markersFavoritos.push(marker);
        });
    };
}


