document.addEventListener('DOMContentLoaded', () => {
  const producto = document.getElementById('producto');
  const extras = document.querySelectorAll('input[name="extras"]');
  const urgente = document.getElementById('urgente');
  const precioFinal = document.getElementById('precioFinal');
  const plazoInfo = document.getElementById('plazoInfo');
  const unidades = document.getElementById('unidades');
  const plazo = document.getElementById('plazo');

  // Función para calcular el presupuesto
  function calcularPresupuesto() {
    let total = 0;
    let plazoDias = 7; // Plazo mínimo.
    const cantidad = parseInt(unidades.value) || 1;

    // Precio del producto
    const opcion = producto.options[producto.selectedIndex];
    const precioProducto = parseFloat(opcion.getAttribute('data-precio')) || 0;
    total += precioProducto * cantidad;

    // Precio de extras por modificaciones
    extras.forEach(extra => {
      if (extra.checked) {
        total += parseFloat(extra.value);
      }
    });

    //Envío urgente
    if ( urgente.checked) {
      total += parseFloat(urgente.value);
      // El envío urgente es 3 días menos del plazo calculado
      const subida = Math.floor((cantidad - 1) / 10) * 4;
      plazoDias = parseInt(plazo.value) + subida - 3;
      if (plazoDias < 7) plazoDias = 7; // mínimo 7 días para urgente
    }else{
      // Plazo estimado = lo que el usuario pone + subida por cada 10 unidades.
      const subida = Math.floor((cantidad - 1) / 10) * 4;
      plazoDias = parseInt(plazo.value) + subida;
      if (plazoDias < 7) plazoDias = 7; // mínimo 7 días
    }

    // Descuento por cantidad
    let descuento = 0;
    if (cantidad >= 20) {
      descuento = 3 + Math.floor((cantidad - 20) / 10) * 3;
      if (descuento > 12) descuento = 12;
      total = total * (1 - descuento / 100);
    }

    // Actualizar en pantalla con 2 decimales
    const precioRedondeado = Math.floor(total * 100) / 100;
    precioFinal.textContent = `${precioRedondeado.toFixed(2)} €`;
    plazoInfo.textContent = `Plazo estimado de entrega: ${plazoDias} días${descuento > 0 ? ` (Descuento aplicado: ${descuento}%)` : ''}`;
  }

  // Eventos para recalcular automáticamente
  producto.addEventListener('change', calcularPresupuesto);
  urgente.addEventListener('input', calcularPresupuesto);
  extras.forEach(extra => extra.addEventListener('change', calcularPresupuesto));
  unidades.addEventListener('input', calcularPresupuesto);
  plazo.addEventListener('input', calcularPresupuesto);

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
