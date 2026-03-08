require('dotenv').config();
const mongoose = require('mongoose');

const clientOptions = { 
  serverApi: { version: '1', strict: true, deprecationErrors: true } 
};

const connPedidos = mongoose.createConnection(process.env.MONGO_URI_PEDIDOS, clientOptions);

const PedidoSchema = new mongoose.Schema({ 
    cliente: { type: String, required: true },
    direccion: { type: String, required: true },
    productos: [{
        nombre: String,
        cantidad: Number,
        precio: Number
    }],
    total: { type: Number, required: true },
    fragil: { type: Boolean, default: false }, 
    fechaPedido: { type: Date, default: Date.now }, 
    fechaEntrega: { type: Date } 
});

const Pedido = connPedidos.model('Pedido', PedidoSchema);

module.exports = Pedido;