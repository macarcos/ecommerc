import * as Model from './model.js';
import * as View from './view.js';

const iniciar = () => {
    View.renderizarProductos(Model.state.productos);
    View.actualizarCarritoUI(Model.state.carrito, Model.calcularTotal());

    // ✅ Carrito controlado por click (ya no por hover)
    const cartContainer = document.querySelector('.cart-container');
    const cartDropdown = document.getElementById('cart-dropdown');

    cartContainer.addEventListener('click', (e) => {
        // Si se hace click en "Pagar Ahora", no cerrar el dropdown
        if (e.target.id === 'btn-checkout') return;
        const estaAbierto = cartDropdown.style.display === 'flex';
        cartDropdown.style.display = estaAbierto ? 'none' : 'flex';
    });

    // Cierra el dropdown si se hace click fuera del carrito
    document.addEventListener('click', (e) => {
        if (!cartContainer.contains(e.target)) {
            cartDropdown.style.display = 'none';
        }
    });

    // Agregar producto al carrito
    View.elementos.grid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add')) {
            const id = parseInt(e.target.dataset.id);
            Model.agregarAlCarrito(id);
            View.actualizarCarritoUI(Model.state.carrito, Model.calcularTotal());
        }
    });

    // Abrir modal de pago
    document.getElementById('btn-checkout').addEventListener('click', () => {
        if (Model.state.carrito.length === 0) return;
        cartDropdown.style.display = 'none';
        View.elementos.resumenTotal.innerText = `$${Model.calcularTotal().toFixed(2)}`;
        View.elementos.modalPago.style.display = 'flex';
    });

    // Cerrar modal de pago
    document.getElementById('btn-cerrar').addEventListener('click', () => {
        View.elementos.modalPago.style.display = 'none';
    });

    // Validación tarjeta: formato 0000 0000 0000 0000
    const inputTarjeta = document.getElementById('input-tarjeta');
    inputTarjeta.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, ''); 
        valor = valor.replace(/(\d{4})/g, '$1 ').trim(); 
        e.target.value = valor.substring(0, 19);
    });

    // Validación fecha: formato MM/AA
    const inputFecha = document.getElementById('input-fecha');
    inputFecha.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length >= 2) {
            valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
        }
        e.target.value = valor.substring(0, 5);
    });

    // Validación CVV: solo 3 números
    const inputCvv = document.getElementById('input-cvv');
    inputCvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });

    // Validación nombre: solo letras
    const inputNombre = document.getElementById('input-nombre');
    inputNombre.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });

    // Enviar formulario de pago
    document.getElementById('form-pago').addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (inputTarjeta.value.length < 19) {
            alert("Por favor, ingresa los 16 números de la tarjeta.");
            return;
        }
        if (inputFecha.value.length < 5) {
            alert("Por favor, ingresa una fecha válida (MM/AA).");
            return;
        }
        if (inputCvv.value.length < 3) {
            alert("El CVV debe tener 3 números.");
            return;
        }

        View.elementos.modalPago.style.display = 'none';
        View.elementos.modalExito.style.display = 'flex';
        Model.vaciarCarrito();
        e.target.reset();
    });

    // Cerrar modal de éxito
    document.getElementById('btn-success-close').addEventListener('click', () => {
        location.reload();
    });
};

iniciar();