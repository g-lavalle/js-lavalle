const productos = [
    { id: 1, nombre: "Análisis numérico", precio: 10000, descripcion: "Burden", imagen: "img/analisis-numerico.jpeg", departamento: "Matematica" },
    { id: 2, nombre: "Álgebra Lineal 2", precio: 15000, descripcion: "Exactas UBA", imagen: "img/algebra-lineal-2.png", departamento: "Matematica" },
    { id: 3, nombre: "FÍsica I", precio: 20000, descripcion: "Sears Zemansky", imagen: "img/fisica1.jpg", departamento: "Fisica" },
    { id: 4, nombre: "Física II", precio: 25000, descripcion: "Sears Zemansky", imagen: "img/fisica2.jpg", departamento: "Fisica" },
    { id: 5, nombre: "Estabilidad I", precio: 30000, descripcion: "Fliess", imagen: "img/estabilidad1.jpeg", departamento: "Estabilidad" },
    { id: 6, nombre: "Termodinámica", precio: 35000, descripcion: "Cengel", imagen: "img/termo.jpg", departamento: "Mecanica" },
    { id: 7, nombre: "M.C.I.A", precio: 31000, descripcion: "Payri", imagen: "img/mcia.png", departamento: "Mecanica" },
    { id: 8, nombre: "Operaciones", precio: 20000, descripcion: "Render", imagen: "img/operaciones.jpg", departamento: "Gestion" }
];

let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

function mostrarProductos() {
    const contenedorProductos = document.getElementById('contenedor-productos');

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <label for="producto${producto.id}-cantidad">Cantidad:</label>
            <input type="number" id="producto${producto.id}-cantidad" value="0" min="0">
            <button onclick="agregarAlCarrito(${producto.id}, ${producto.precio})">Agregar al Carrito</button>
        `;

        contenedorProductos.appendChild(productoDiv);
    });
}

function agregarAlCarrito(productoId, precio) {
    const cantidadInput = document.getElementById(`producto${productoId}-cantidad`);
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad > 0) {
        const productoEnCarrito = carrito.find(item => item.id === productoId);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            carrito.push({ id: productoId, precio: precio, cantidad: cantidad });
        }

        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
        mostrarCarrito();
    }
}

function actualizarCarrito() {
    let cantidadCarrito = 0;
    let totalCarrito = 0;

    carrito.forEach(producto => {
        cantidadCarrito += producto.cantidad;
        totalCarrito += producto.precio * producto.cantidad;
    });

    document.getElementById('cantidad-carrito').innerText = cantidadCarrito;
    document.getElementById('total-carrito').innerText = totalCarrito.toFixed(2);
}

function mostrarCarrito() {
    const contenedorCarritoLista = document.getElementById('contenedor-carrito-lista');
    contenedorCarritoLista.innerHTML = ''; // Limpia el contenido previo

    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Subtotal: $${(producto.precio * item.cantidad).toFixed(2)}</p>
            <button class="eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;

        contenedorCarritoLista.appendChild(productoDiv);
    });
}

function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    mostrarCarrito();
}

document.getElementById('finalizar-compra').addEventListener('click', () => {
    const totalCompra = document.getElementById('total-carrito').innerText;

    Swal.fire({
        title: '¡Compra Finalizada!',
        text: `El total de tu compra es $${totalCompra}.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        sessionStorage.removeItem('carrito');
        carrito = [];
        actualizarCarrito();
        mostrarCarrito();
    });
});

mostrarProductos();
actualizarCarrito();
mostrarCarrito();
