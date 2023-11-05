const productos = [

/** MATES **/

    {
        id: "trenzado",
        titulo: "Mate Trenzado",
        imagen: "./images/matetrenzado.jpg",
        categoria: {
            nombre: "Mates",
            id:"mates",
        },
        precio: 10000
    },
    {
        id: "torpedo",
        titulo: "Mate Torpedo",
        imagen: "./images/matetorpedo.jpg",
        categoria: {
            nombre: "Mates",
            id:"mates",
        },
        precio: 11000,
    },
    {
        id: "imperial",
        titulo: "Mate Imperial",
        imagen: "./images/mateimperial.jpg",
        categoria: {
            nombre: "Mates",
            id:"mates",
        },
        precio: 13500
    },
    {
        id: "superi",
        titulo: "Mate Super Imperial",
        imagen: "./images/matesuperimperial.jpg",
        categoria: {
            nombre: "Mates",
            id:"mates",
        },
        precio: 16000
    },

/** TERMOS **/

    {
        id: "termo1",
        titulo: "Autocebante 750ml",
        imagen: "./images/termo1.png",
        categoria: {
            nombre: "Termos",
            id:"termos",
        },
        precio: 10000
    },
    {
        id: "termo2",
        titulo: "Termo Media Manija 1L",
        imagen: "./images/termo2.png",
        categoria: {
            nombre: "Termos",
            id:"termos",
        },
        precio: 13000
    },
    {
        id: "termo3",
        titulo: "Termo Stanley 1L",
        imagen: "./images/termo3.png",
        categoria: {
            nombre: "Termos",
            id:"termos",
        },
        precio: 40000
    },
    {
        id: "termo4",
        titulo: "Termo St.System 1.2L",
        imagen: "./images/termo4.png",
        categoria: {
            nombre: "Termos",
            id:"termos",
        },
        precio: 80000
    },

/** YERBAS **/
    
    {
        id: "canarias",
        titulo: "Yerba Canarias 500g",
        imagen: "./images/yerbacanaria.png",
        categoria: {
            nombre: "Yerbas",
            id:"yerbas",
        },
        precio: 5000
    },
    {
        id: "reiverde",
        titulo: "Yerba ReiVerde 1kg",
        imagen: "./images/yerbareiverde.png",
        categoria: {
            nombre: "Yerbas",
            id:"yerbas",
        },
        precio: 7000
    },
    {
        id: "tucangua",
        titulo: "Yerba Tucangua 1kg",
        imagen: "./images/yerbatucan.png",
        categoria: {
            nombre: "Yerbas",
            id:"yerbas",
        },
        precio: 5000
    },
    {
        id: "vieja",
        titulo: "Yerba Picada Vieja 500g",
        imagen: "./images/yerbavieja.png",
        categoria: {
            nombre: "TipoYerbas",
            id:"yerbas",
        },
        precio: 3000
    },
]

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

cargarProductos(productos);

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