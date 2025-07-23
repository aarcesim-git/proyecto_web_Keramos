// Cambia el navbar al hacer scroll
const navbar = document.getElementById('navbar');

function scrollNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add('nav-scroll');
  } else {
    navbar.classList.remove('nav-scroll');
  }
}
window.addEventListener('scroll', scrollNavbar);

// Filtro de categorías selecciona  botones con la clase 'filtro-btn' y secciones con la clase 'categoria'
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

// Efecto de scroll para mostrar elementos, selecciona los elementos de la clase 'card-scroll'
const elements = document.querySelectorAll('.card-scroll');

function mostrarElements () {
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      element.classList.add('show');
    } else {
      element.classList.remove('show');
    }
  });
}

window.addEventListener('scroll', mostrarElements);
window.addEventListener('load', mostrarElements);
