const botones = document.querySelectorAll('.filtro-btn');
const categorias = document.querySelectorAll('.categoria');

botones.forEach(btn => {
  btn.addEventListener('click', () => {
    // Quitar clase active a todos
    botones.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const categoriaSeleccionada = btn.dataset.categoria;

    categorias.forEach(seccion => {
      if (seccion.dataset.categoria === categoriaSeleccionada) {
        seccion.classList.add('visible');
      } else {
        seccion.classList.remove('visible');
      }
    });
  });
});

document.querySelectorAll('.imagen-link').forEach(link => {
  const img = new Image();
  img.src = link.dataset.src;
  img.onload = function() {
    link.textContent += ` (${img.width}x${img.height})`;
  }
});
