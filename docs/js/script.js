const negocioCoords = [40.4263, -3.7038]; // Calle del Espíritu Santo, 27, Madrid

const map = L.map('map').setView(negocioCoords, 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker(negocioCoords).addTo(map)
  .bindPopup('Kéramos<br>Calle del Espíritu Santo, 27')
  .openPopup();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const userCoords = [position.coords.latitude, position.coords.longitude];

    L.Routing.control({
      waypoints: [
        L.latLng(userCoords),
        L.latLng(negocioCoords)
      ],
      routeWhileDragging: false
    }).addTo(map);
  }, function() {
    alert('No se pudo obtener tu ubicación.');
  });
} else {
  alert('Tu navegador no soporta geolocalización.');
}
