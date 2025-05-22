const carrossel = document.getElementById('carrossel');
const images = document.querySelectorAll('#carrossel img');
let index = 0;

function nextImage() {
    index = (index + 1) % images.length;
    carsel.style.transform = `translateX(-${index * images[0].clientWidth}px)`;
}

setInterval(nextImage, 3000);
