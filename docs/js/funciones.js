/* == CARGA DE NOTICIAS == */
document.addEventListener("DOMContentLoaded", () => {
    fetch('data/noticias.json')
      .then(response => response.json())
      .then(noticias => {
        const contenedor = document.getElementById('contenedor-noticias');
        noticias.forEach(noticia => {
          const div = document.createElement('div');
          div.classList.add('noticia');
          div.innerHTML = `
            <h4>${noticia.titulo}</h4>
            <p><em>${noticia.fecha}</em></p>
            <p>${noticia.contenido}</p>
          `;
          contenedor.appendChild(div);
        });
      })
      .catch(error => {
        console.error('Error cargando las noticias:', error);
      });
  });

  /** == MENU TOGGLE == */
  document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('show');
  });
});
  