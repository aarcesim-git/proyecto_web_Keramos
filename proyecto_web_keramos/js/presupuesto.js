document.addEventListener('DOMContentLoaded', () => {
  const producto = document.getElementById('producto');
  const plazo = document.getElementById('plazo');
  const extras = document.querySelectorAll('input[name="extras"]');
  const precioFinal = document.getElementById('precioFinal');

  function calcularPresupuesto() {
    let total = 0;

    // Precio del producto
    const opcion = producto.options[producto.selectedIndex];
    const precioProducto = parseFloat(opcion.getAttribute('data-precio')) || 0;
    total += precioProducto;

    // Precio de extras por modificaciones
    extras.forEach(extra => {
      if (extra.checked) {
        total += parseFloat(extra.value);
      }
    });

    // Descuento por plazo (si supera los 10 o 20 días se realizará un descuento)
    const dias = parseInt(plazo.value) || 0;
    if (dias >= 10) {
      total *= 0.9; // 10% de descuento
    } else if (dias >= 20) {
      total *= 0.85; // 15% de descuento
    }

    // Actualizar en pantalla con 2 decimales
    precioFinal.textContent = `${total.toFixed(2)} €`;
  }

  // Eventos para recalcular automáticamente
  producto.addEventListener('change', calcularPresupuesto);
  plazo.addEventListener('input', calcularPresupuesto);
  extras.forEach(extra => extra.addEventListener('change', calcularPresupuesto));

  // Evita el envío si los datos son inválidos (validación base)
  const formulario = document.getElementById('formularioPresupuesto');
  formulario.addEventListener('submit', e => {
    if (!formulario.checkValidity()) {
      alert('Por favor, completa correctamente todos los campos antes de enviar.');
      e.preventDefault();
    }
  });
});
