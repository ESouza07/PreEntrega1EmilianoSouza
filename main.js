//SIMULADOR COMPRA DE UN PRODUCTO PAGANDO DE CONTADO Y EN CUOTAS

alert("Bienvenidos a Le Matte!");
alert("Ingrese el producto que desea adquirir del siguiente listado");

const carrito = [];

//Listado de productos
const productos = [
  { nombre: "Mate Torpedo", precio: 5000 },
  { nombre: "Mate Camionero", precio: 7000 },
  { nombre: "Mate Imperial", precio: 12000 },
  { nombre: "Mate Imperial Cincelado", precio: 15000 }
];


const mostrarProductos = () => {
  const listaProductos = productos.map(producto => {
    return "-" + producto.nombre + " : " + " $ " + producto.precio;
  });

  alert("Listado de productos:" + "\n\n" + listaProductos.join("\n"));
  const subtotal = comprarProductos(listaProductos);
  mostrarDetalleCompra(subtotal);
  formaDePago(subtotal);
};


//Selección de poductos
const comprarProductos = (listaProductos) => {
  let productoSeleccionado = "";
  let cantidadSeleccionada = 0;
  let buscarProducto = 0;
  let subtotal = 0;
  let seguirComprando = true;

  do {
    productoSeleccionado = prompt("¿Qué producto desea adquirir?" + "\n\n" + listaProductos.join("\n"));
    cantidadSeleccionada = parseInt(prompt("Ingrese la cantidad que desea adquirir"));
    buscarProducto = productos.find(producto => producto.nombre.toLowerCase() === productoSeleccionado.toLocaleLowerCase());

    if (!buscarProducto) {
      alert("Producto no válido");
      continue;
    };

    const totalProducto = buscarProducto.precio * cantidadSeleccionada;
    carrito.push({ nombre: buscarProducto.nombre, cantidad: cantidadSeleccionada });
    subtotal += totalProducto;

    alert("Has agregado al carrito: " + cantidadSeleccionada + " unidades de " + productoSeleccionado + " por un valor de $ " + Math.round(+totalProducto));

    seguirComprando = confirm("¿Desea seguir comprando?");

  } while (seguirComprando);

  return subtotal;
};


//Detalle compra
const mostrarDetalleCompra = (subtotal) => {
  const listaCarrito = carrito.map(producto => {
    return '- ' + producto.nombre + ' | Cantidad: ' + producto.cantidad;
  });

  const confirmarCompra = confirm('Detalle carrito: '
    + '\n\n' + listaCarrito.join('\n')
    + '\n\nMonto Total: $' + Math.round(subtotal));
};


//Formas de pago
const formaDePago = (subtotal) => {
  const cantidadCuotas = Number(prompt("¿Cómo desea pagarlo? \n Ingrese cantidad de cuotas: (1, 3, 6, 12"));
  const tasaInteresMensual = 0.10;

  if (cantidadCuotas === 1) {
    const pagoContado = subtotal * 0.85;  //descuento del 15% al contado
    alert("El monto total a pagar en una cuota es: $" + Math.round(pagoContado));

  } else {
    const cuota = subtotal * (tasaInteresMensual / (1 - Math.pow(1 + tasaInteresMensual, -cantidadCuotas)));
    const montoTotalPagado = cuota * cantidadCuotas;
    alert("El monto total a pagar en " + cantidadCuotas + " cuotas es de $" + Math.round(montoTotalPagado));
  }
};


mostrarProductos();


alert("Su compra ha sido realzada con exito! Gracias por visitar Le Matte.");