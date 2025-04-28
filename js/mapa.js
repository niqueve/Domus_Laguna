let mapInstance;

function initMap() {
    mapInstance = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -22.9194, lng: -42.8185 }, 
        zoom: 12,
    });
}
