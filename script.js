// Defino un array con los productos disponibles, le da escalabilidad a la pagina
const productos = [
    { id: 1, nombre: "Análisis numérico", precio: 10000, descripcion: "Burden", imagen: "img/analisis-numerico.jpeg", departamento:"Matematica" },
    { id: 2, nombre: "Álgebra Lineal 2", precio: 15000, descripcion: "Exactas UBA", imagen: "img/algebra-lineal-2.png", departamento:"Matematica" },
    { id: 3, nombre: "FÍsica I", precio: 20000, descripcion: "Sears Zemansky", imagen: "img/fisica1.jpg", departamento:"Fisica" },
    { id: 4, nombre: "Física II", precio: 25000, descripcion: "Sears Zemansky", imagen: "img/fisica2.jpg", departamento:"Fisica" },
    { id: 5, nombre: "Estabilidad I", precio: 30000, descripcion: "Fliess", imagen: "img/estabilidad1.jpeg", departamento:"Estabilidad" },
    { id: 6, nombre: "Termodinámica", precio: 35000, descripcion: "Cengel", imagen: "img/termo.jpg", departamento:"Mecanica" },
    { id: 7, nombre: "M.C.I.A", precio: 31000, descripcion: "Payri", imagen: "img/mcia.png", departamento:"Mecanica" },
    { id: 8, nombre: "Operaciones", precio: 20000, descripcion: "Render", imagen: "img/operaciones.jpg", departamento:"Gestion" }
];

let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

// Muestro los productos en la página
function mostrarProductos() {
    const contenedorProductos = document.getElementById('contenedor-productos');

    productos.forEach(producto => {
        // Creo un div para cada producto
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        // Inserto el HTML
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <br>
            <p>Precio: $${producto.precio}</p>
            <label for="producto${producto.id}-cantidad">Cantidad:</label>
            <input type="number" id="producto${producto.id}-cantidad" value="0" min="0">
            <button onclick="agregarAlCarrito(${producto.id}, ${producto.precio})">Agregar al Carrito</button>
        `;

        // Añado el div al contenedor de productos en el DOM
        contenedorProductos.appendChild(productoDiv);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(productoId, precio) {
    // Obtengo la cantidad seleccionada por el usuario
    const cantidadInput = document.getElementById(`producto${productoId}-cantidad`);
    const cantidad = parseInt(cantidadInput.value);

    // Si la cantidad es mayor a 0, se agrega al carrito
    if (cantidad > 0) {
        // Busca si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.id === productoId);

        if (productoEnCarrito) {
            // Si el producto ya está en el carrito, sumo la cantidad
            productoEnCarrito.cantidad += cantidad;
        } else {
            // Si el producto no está en el carrito, lo agrego como un nuevo objeto
            carrito.push({ id: productoId, precio: precio, cantidad: cantidad });
        }

        sessionStorage.setItem('carrito', JSON.stringify(carrito));

        actualizarCarrito();
    }
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    let cantidadCarrito = 0;  // Contador para la cantidad total de productos en el carrito
    let totalCarrito = 0;     // Acumulador para el costo total del carrito

    // Recorro cada producto en el carrito para sumar cantidades y calcular el total
    carrito.forEach(producto => {
        cantidadCarrito += producto.cantidad;
        totalCarrito += producto.precio * producto.cantidad;
    });

    document.getElementById('cantidad-carrito').innerText = cantidadCarrito;
    document.getElementById('total-carrito').innerText = totalCarrito.toFixed(2); // Redondea a 2 decimales
}

document.getElementById('finalizar-compra').addEventListener('click', () => {

    const totalCompra = document.getElementById('total-carrito').innerText;

    // Muestro un mensaje de confirmación en la página
    const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
    mensajeConfirmacion.innerText = `¡Gracias por tu compra! El total de tu compra es $${totalCompra}.`;
    mensajeConfirmacion.style.display = 'block'; // Muestra el mensaje, por default en el HTML esta con display none

    // Limpia el carrito
    sessionStorage.removeItem('carrito');
    carrito = [];
    actualizarCarrito();
});

// Cargo programa
mostrarProductos();

// Actualizo la visualización del carrito desde sessionStorage cuando se carga la página
actualizarCarrito();
