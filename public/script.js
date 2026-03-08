let carrito = [];

// 1. Cargar catálogo al abrir
fetch('/api/catalogo')
    .then(res => res.json())
    .then(data => {
        const select = document.getElementById('select-productos');
        select.innerHTML = data.map(p => `<option value="${p.nombreProducto}">${p.nombreProducto} (${p.precioUnidad}€)</option>`).join('');
    });

// 2. Añadir al carrito local
document.getElementById('btn-agregar').onclick = async () => {
    const nombre = document.getElementById('select-productos').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);

    // 1. Consultar al servidor ANTES de añadir al carrito
    const res = await fetch('/api/validar-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreProducto: nombre, cantidadDeseada: cantidad })
    });
    
    const data = await res.json();

    if (data.disponible) {
        // Todo OK, añadimos
        carrito.push({ nombre, cantidad });
        document.getElementById('lista-carrito').innerHTML += `<li>${nombre} x ${cantidad}</li>`;
    } else {
        // 2. Aquí entra tu lógica de "No hay stock"
        const confirmacion = confirm(`${data.mensaje} ¿Quieres añadir las ${data.unidadesDisponibles} unidades disponibles?`);
        
        if (confirmacion) {
            carrito.push({ nombre, cantidad: data.unidadesDisponibles });
            document.getElementById('lista-carrito').innerHTML += `<li>${nombre} x ${data.unidadesDisponibles} (ajustado por stock)</li>`;
        }
    }
};

// 3. Enviar al servidor
document.getElementById('btn-finalizar').onclick = async () => {
    const pedido = {
        cliente: document.getElementById('nombre').value,
        direccion: document.getElementById('direccion').value,
        productos: carrito
    };

    const res = await fetch('/api/finalizar-pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    });

    const data = await res.json();
    document.getElementById('seccion-factura').classList.remove('hidden');
    document.getElementById('factura-output').innerText = data.facturaVisual;
};