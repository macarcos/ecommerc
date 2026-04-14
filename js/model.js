export const state = {
    productos: [
        { id: 1, nombre: "Smartphone Pro", precio: 800, img: "https://picsum.photos/id/1/200" },
        { id: 2, nombre: "Audífonos BT", precio: 150, img: "https://picsum.photos/id/2/200" },
        { id: 3, nombre: "Reloj Fit", precio: 250, img: "https://picsum.photos/id/3/200" },
        { id: 4, nombre: "Teclado RGB", precio: 100, img: "https://picsum.photos/id/4/200" },
        { id: 5, nombre: "Mouse Gamer", precio: 50, img: "https://picsum.photos/id/5/200" },
        { id: 6, nombre: "Laptop Air", precio: 1200, img: "https://picsum.photos/id/6/200" },
        { id: 7, nombre: "Cámara Pro", precio: 900, img: "https://picsum.photos/id/7/200" },
        { id: 8, nombre: "E-Reader", precio: 130, img: "https://picsum.photos/id/8/200" },
        { id: 9, nombre: "Parlante HD", precio: 75, img: "https://picsum.photos/id/9/200" },
        { id: 10, nombre: "Tablet 10", precio: 400, img: "https://picsum.photos/id/10/200" },
        { id: 11, nombre: "Dron Mini", precio: 500, img: "https://picsum.photos/id/11/200" },
        { id: 12, nombre: "Micro SSD", precio: 80, img: "https://picsum.photos/id/12/200" },
        { id: 13, nombre: "Webcam 4K", precio: 110, img: "https://picsum.photos/id/13/200" },
        { id: 14, nombre: "Gamepad X", precio: 60, img: "https://picsum.photos/id/14/200" },
        { id: 15, nombre: "Router WiFi6", precio: 140, img: "https://picsum.photos/id/15/200" },
        { id: 16, nombre: "Powerbank", precio: 40, img: "https://picsum.photos/id/16/200" },
        { id: 17, nombre: "Monitor 27", precio: 300, img: "https://picsum.photos/id/17/200" },
        { id: 18, nombre: "Cargador Rápido", precio: 25, img: "https://picsum.photos/id/18/200" },
        { id: 19, nombre: "VR Headset", precio: 450, img: "https://picsum.photos/id/19/200" },
        { id: 20, nombre: "Smart Bulb", precio: 15, img: "https://picsum.photos/id/20/200" }
    ],
    carrito: JSON.parse(localStorage.getItem('cart')) || []
};

export const agregarAlCarrito = (id) => {
    const producto = state.productos.find(p => p.id === id);
    if (producto) {
        state.carrito.push(producto);
        localStorage.setItem('cart', JSON.stringify(state.carrito));
    }
};

export const calcularTotal = () => state.carrito.reduce((acc, p) => acc + p.precio, 0);
export const vaciarCarrito = () => { state.carrito = []; localStorage.removeItem('cart'); };