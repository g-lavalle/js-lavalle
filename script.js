let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
let productos = [];

    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos();
        })
        .catch(() => {
            mostrarSweetAlert('error', 'No se pudo cargar los productos.');
        });



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
