require('dotenv').config();
const mongoose = require('mongoose');

const clientOptions = { 
  serverApi: { version: '1', strict: true, deprecationErrors: true } 
};  

const connStock = mongoose.createConnection(process.env.MONGO_URI_STOCK, clientOptions);

const StockSchema = new mongoose.Schema({ 
    nombreProducto: { type: String, required: true },
    precioUnidad: { type: Number, required: true },
    unidadesStock: { type: Number, required: true },
    fragil: { type: Boolean, default: false }, 
});

const Stock = connStock.model('Stock', StockSchema);

module.exports = Stock;