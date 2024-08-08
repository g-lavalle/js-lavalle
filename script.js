// Inicialización del carrito
let carrito = JSON.parse(sessionStorage.getItem('carrito')) || {};
actualizarCarrito();

function agregarAlCarrito(productoId, precio) {
    const cantidadInput = document.getElementById(`producto${productoId}-cantidad`);
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad > 0) {
        // Actualizar el carrito en el almacenamiento de la sesión
        if (carrito[productoId]) {
            carrito[productoId].cantidad += cantidad;
        } else {
            carrito[productoId] = { precio: precio, cantidad: cantidad };
        }

        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    let cantidadCarrito = 0;
    let totalCarrito = 0;

    for (let productoId in carrito) {
        cantidadCarrito += carrito[productoId].cantidad;
        totalCarrito += carrito[productoId].precio * carrito[productoId].cantidad;
    }

    document.getElementById('cantidad-carrito').innerText = cantidadCarrito;
    document.getElementById('total-carrito').innerText = totalCarrito.toFixed(2);
}

document.getElementById('finalizar-compra').addEventListener('click', () => {
    alert(`El total de su compra es $${document.getElementById('total-carrito').innerText}`);
    sessionStorage.removeItem('carrito');
    carrito = {};
    actualizarCarrito();
});
