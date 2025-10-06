document.addEventListener('DOMContentLoaded', () => {
  const producto = document.getElementById('producto');
  const extras = document.querySelectorAll('input[name="extras"]');
  const urgente = document.getElementById('urgente');
  const precioFinal = document.getElementById('precioFinal');
  const plazoInfo = document.getElementById('plazoInfo');
  const unidades = document.getElementById('unidades');

  // Función para calcular el presupuesto
  function calcularPresupuesto() {
    let total = 0;
    let plazoDias = 7; // Plazo mínimo.

    // Precio del producto
    const opcion = producto.options[producto.selectedIndex];
    const precioProducto = parseFloat(opcion.getAttribute('data-precio')) || 0;
    const cantidad = parseInt(unidades.value) || 1;
    total += precioProducto * cantidad;

    // Precio de extras por modificaciones
    extras.forEach(extra => {
      if (extra.checked) {
        total += parseFloat(extra.value);
      }
    });

    //Envío urgente.
    if ( urgente.checked) {
      total += parseFloat(urgente.value);
      plazoDias = 5;  // Cambia el plazo a 5 días si es urgente 
    }else{
      plazoDias = 7; // Plazo estándar
    }

    // Actualizar en pantalla con 2 decimales
    const precioRedondeado = Math.floor(total * 100) / 100;
    precioFinal.textContent = `${precioRedondeado.toFixed(2)} €`;
  }

  // Eventos para recalcular automáticamente
  producto.addEventListener('change', calcularPresupuesto);
  urgente.addEventListener('input', calcularPresupuesto);
  extras.forEach(extra => extra.addEventListener('change', calcularPresupuesto));

  // Evita el envío si los datos son inválidos (validación base)
  const formulario = document.getElementById('formularioPresupuesto');
  formulario.addEventListener('submit', e => {
    if (!formulario.checkValidity()) {
      alert('Por favor, completa correctamente todos los campos antes de enviar.');
      e.preventDefault();
    }
  });

  calcularPresupuesto(); 
});
