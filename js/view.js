export const elementos = {
    grid: document.getElementById('product-grid'),
    contador: document.getElementById('cart-count'),
    total: document.getElementById('total-amount'),
    listaMini: document.getElementById('cart-items-list'),
    modalPago: document.getElementById('modal-pago'),
    modalExito: document.getElementById('modal-exito'),
    resumenTotal: document.getElementById('summary-total')
};

export const renderizarProductos = (productos) => {
    elementos.grid.innerHTML = productos.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button class="btn-add" data-id="${p.id}">Añadir al Carrito</button>
        </div>
    `).join('');
};

export const actualizarCarritoUI = (carrito, total) => {
    elementos.contador.innerText = carrito.length;
    elementos.total.innerText = total.toFixed(2);
    
    elementos.listaMini.innerHTML = carrito.map(p => `
        <div class="cart-item-mini">
            <span>${p.nombre}</span>
            <strong>$${p.precio}</strong>
        </div>
    `).join('');
};