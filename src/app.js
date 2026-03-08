const express = require('express');
const app = express();

// 1. IMPORTANTE: Para que Express entienda el cuerpo de las peticiones POST
app.use(express.json());
// 2. Servir archivos estáticos (HTML/CSS)
app.use(express.static('public')); 

const { comprobarDisponibilidad, finalizarPedido, obtenerCatalogoDisponible} = require('./controllers/pedidoController');

// Endpoint de finalizar y guardar pedido
app.post('/api/finalizar-pedido', finalizarPedido);

// Endpoint de validación
app.post('/api/validar-stock', comprobarDisponibilidad);

// Endopoint para el desplegable de productos
app.get('/api/catalogo', obtenerCatalogoDisponible)

app.listen(3000, () => console.log('Servidor en puerto 3000'));