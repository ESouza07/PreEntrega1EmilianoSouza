let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const containerProductos = document.querySelector("#containerProductos");
const botonesCategorias = document.querySelectorAll(".btnCate");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".productoAgregar");
const numero = document.querySelector("#numero");

function cargarProductos(productosElegidos) {

    containerProductos.innerHTML = "";

    productosElegidos.forEach(producto => {        
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="productoImagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="productoDetalles">
            <h3 class="productoTitulo">${producto.titulo}</h3>
            <p class="productoPrecio">${producto.precio}</p>
            <button class="productoAgregar" id="${producto.id}">Agregar</button>
        </div>`;
        containerProductos.append(div);
    })
    actualizarBotones();
}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre; 
            const productosSegunCategoria = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosSegunCategoria);
        } else {
            tituloPrincipal.innerText = "Nuestros Productos";
            cargarProductos(productos);
        }
    })
})

function actualizarBotones() {
    botonesAgregar = document.querySelectorAll(".productoAgregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productoEnCarrito;
let productoEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productoEnCarritoLS) {
    productoEnCarrito = JSON.parse(productoEnCarritoLS);
    sumarNumero();
} else {
    productoEnCarrito = []
}

function agregarAlCarrito(e) {
    
    Toastify({
        text: "Agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #678d58, black)",
          borderRadius: "2rem",
          textTransform: "upperCase",
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if (productoEnCarrito.some(producto => producto.id === idBoton)){
        const index = productoEnCarrito.findIndex(producto => producto.id === idBoton);
        productoEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productoEnCarrito.push(productoAgregado);
    }
    sumarNumero();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));
};

function sumarNumero() {
    let nuevoNumero = productoEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
};

const colorModeButton = document.querySelector("#colorMode");
const main = document.querySelector("main");
let darkMode = localStorage.getItem("darkMode")

function activaDarkMode() {
    main.classList.toggle("darkMode");
    localStorage.setItem("darkMode", "activado");
};

function desactivarDarkMode() {
    main.classList.remove("darkMode");
    localStorage.setItem("darkMode", "desactivado");
}

if (darkMode === "activado") {
    activaDarkMode();
} else {
    desactivarDarkMode();
};

colorModeButton.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if(darkMode === "activado") {
        desactivarDarkMode();
        colorModeButton.innerText = "Cambiar a DarkMode";
        localStorage.setItem("colorModeButtonText", "Cambiar a DarkMode");
    } else {
        activaDarkMode();
        colorModeButton.innerText = "Cambiar a LightMode";
        localStorage.setItem("colorModeButtonText", "Cambiar a LightMode");
    };
});