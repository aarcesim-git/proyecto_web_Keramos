document.addEventListener('DOMContentLoaded', () => { /*Espera a que el HTML esté cargado antes de ejecutar el código*/
  fetch('data/noticias.json')
    .then(response => response.json())
    .then(noticias => { /*Cuando los datos estén listos, recorre cada noticia y la muestra. */
      const contenedor = document.getElementById('contenedor-noticias');
      noticias.forEach(noticia => {
        const div = document.createElement('div');
        div.className = 'noticia';
        div.innerHTML = `
          <h4>${noticia.titulo}</h4>
          <small>${noticia.fecha}</small>
          <p>${noticia.contenido}</p>
        `;
        contenedor.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error al cargar las noticias:', error);
    });
});