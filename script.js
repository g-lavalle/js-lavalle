// Define un array con los productos disponibles
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

// Inicializa el carrito a partir de sessionStorage, si existe. Si no, se crea un carrito vacío.
let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

// Muestra los productos en la página
function mostrarProductos() {
    const contenedorProductos = document.getElementById('contenedor-productos');

    productos.forEach(producto => {
        // Crea un div para cada producto
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        // Inserta el HTML para mostrar el producto incluyendo la imagen
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

        // Añade el div al contenedor de productos en el DOM
        contenedorProductos.appendChild(productoDiv);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(productoId, precio) {
    // Obtiene la cantidad seleccionada por el usuario
    const cantidadInput = document.getElementById(`producto${productoId}-cantidad`);
    const cantidad = parseInt(cantidadInput.value);

    // Si la cantidad es mayor a 0, se procede a agregar al carrito
    if (cantidad > 0) {
        // Busca si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.id === productoId);

        if (productoEnCarrito) {
            // Si el producto ya está en el carrito, se suma la cantidad
            productoEnCarrito.cantidad += cantidad;
        } else {
            // Si el producto no está en el carrito, se agrega como un nuevo objeto
            carrito.push({ id: productoId, precio: precio, cantidad: cantidad });
        }

        // Guarda el carrito actualizado en sessionStorage
        sessionStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualiza la visualización del carrito
        actualizarCarrito();
    }
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    let cantidadCarrito = 0;  // Contador para la cantidad total de productos en el carrito
    let totalCarrito = 0;     // Acumulador para el costo total del carrito

    // Recorre cada producto en el carrito para sumar cantidades y calcular el total
    carrito.forEach(producto => {
        cantidadCarrito += producto.cantidad;
        totalCarrito += producto.precio * producto.cantidad;
    });

    // Actualiza el DOM para mostrar la cantidad total de productos y el costo total
    document.getElementById('cantidad-carrito').innerText = cantidadCarrito;
    document.getElementById('total-carrito').innerText = totalCarrito.toFixed(2); // Redondea a 2 decimales
}

document.getElementById('finalizar-compra').addEventListener('click', () => {
    // Calcula el total
    const totalCompra = document.getElementById('total-carrito').innerText;

    // Muestra un mensaje de confirmación en la página
    const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
    mensajeConfirmacion.innerText = `¡Gracias por tu compra! El total de tu compra es $${totalCompra}.`;
    mensajeConfirmacion.style.display = 'block'; // Muestra el mensaje

    // Limpia el carrito
    sessionStorage.removeItem('carrito');
    carrito = [];
    actualizarCarrito();
});

// Mostrar productos en la página cuando se carga
mostrarProductos();

// Actualizar la visualización del carrito desde sessionStorage cuando se carga la página
actualizarCarrito();
