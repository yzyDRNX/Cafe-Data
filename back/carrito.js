// Obtener productos del carrito
async function obtenerCarrito(id_usuario) {
    try {
      const response = await fetch(`http://localhost:3000/api/carrito/${id_usuario}`);
      const carrito = await response.json();
      
      let html = '';
      carrito.forEach(item => {
        html += `<p>Producto ID: ${item.p_id} | Cantidad: ${item.cantidad}</p>`;
      });
      
      document.getElementById('carrito-lista').innerHTML = html;
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  }
  
  // Obtener los productos disponibles
  async function obtenerProductos() {
    try {
      const response = await fetch('http://localhost:3000/api/productos');
      const productos = await response.json();
      
      let html = '';
      productos.forEach(producto => {
        html += `
          <div>
            <img src="${producto.url_imagen}" alt="${producto.nombre}" />
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.p_id}, 1)">Agregar al carrito</button>
          </div>
        `;
      });
      
      document.getElementById('productos-lista').innerHTML = html;
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }
  
  // Agregar producto al carrito
  async function agregarAlCarrito(p_id, cantidad) {
    try {
      const body = { id_usuario: 1, p_id, cantidad }; // Suponemos que el id_usuario es 1 por ahora
      const response = await fetch('http://localhost:3000/api/carrito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  }
  