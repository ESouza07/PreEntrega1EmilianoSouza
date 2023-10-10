let nombreUsuario = prompt("¡Bienvenido a Le Matte! Por favor, ingresa tu nombre:");

alert(`Hola, ${nombreUsuario}. Bienvenido a Le Matte.`);

function comprarMate(nombre, precio) {
  let pago = Number(prompt(`Con cuánto vas a pagar por el ${nombre}?`));
  if (pago >= precio) {
    let vuelto = pago - precio;
    let confirmacion = confirm(`¿Estás seguro de que deseas comprar el ${nombre} por $${precio}?`);
    if (confirmacion) {
      alert(`Gracias por comprar nuestro ${nombre}. Tu vuelto es de $${vuelto}`);
    } else {
      alert(`Compra del ${nombre} cancelada.`);
    }
  } else {
    let faltante = precio - pago;
    alert(`Lo siento, te faltan $${faltante} para comprar nuestro ${nombre}.`);
  }
}

let productos = Number(prompt(`Qué mate deseas comprar, ${nombreUsuario}? Ingresa el número correspondiente:
    1. Mate Torpedo $5000
    2. Mate Imperial $12000
    3. Mate Camionero $6000
    4. Salir`));

  while (productos !== 4) {
  switch (productos) {
    case 1:
      comprarMate("Mate Torpedo", 5000);
      break;

    case 2:
      comprarMate("Mate Imperial", 12000);
      break;

    case 3:
      comprarMate("Mate Camionero", 6000);
      break;

    default:
      alert("Opción no válida. Por favor, selecciona una opción válida.");
      break;
  }

  productos = Number(prompt(`Qué deseas comprar ahora, ${nombreUsuario}?
    1. Mate Torpedo $5000
    2. Mate Imperial $12000
    3. Mate Camionero $6000
    4. Salir`));
}

alert("Gracias por visitar Le Matte.");