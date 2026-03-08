const Pedido = require('../models/Pedidos');
const Stock = require('../models/Productos');

const dayjs = require('dayjs');

// FUNCIÓN 1: Validar Stock (Para cuando el usuario añade al carrito)
const comprobarDisponibilidad = async (req, res) => {
    const { nombreProducto, cantidadDeseada } = req.body;

    try {
        const producto = await Stock.findOne({ nombreProducto: nombreProducto });

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        if (producto.unidadesStock >= cantidadDeseada) {
            // Hay suficiente
            res.status(200).json({ 
                disponible: true, 
                mensaje: "Stock confirmado",
                precio: producto.precioUnidad 
            });
        } else {
            // No hay suficiente, devolvemos lo que queda
            res.status(200).json({ 
                disponible: false, 
                unidadesDisponibles: producto.unidadesStock,
                mensaje: `Lo sentimos, solo quedan ${producto.unidadesStock} unidades.`
            });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error al consultar stock", error });
    }
};

function generarFacturaLineas(productos) {
    return productos.map(item => {
        const subtotal = item.precio * item.cantidad;
        return `  - ${item.nombre.padEnd(25)} | ${item.cantidad} x ${item.precio.toFixed(2)}€ = ${subtotal.toFixed(2)}€`;
    }).join('\n');
}

const finalizarPedido = async (req, res) => {
    const { cliente, direccion, productos } = req.body;
    const IVA_VAL = 0.21;

    try {
        let baseImponible = 0;
        let esFragil = false;
        let productosValidados = [];

        // 1. Validar y restar stock
        for (const item of productos) {
            const pStock = await Stock.findOne({ nombreProducto: item.nombre });
            if (!pStock || pStock.unidadesStock < item.cantidad) {
                return res.status(400).json({ mensaje: `Sin stock de ${item.nombre}` });
            }
            if (pStock.fragil) esFragil = true;
            
            baseImponible += pStock.precioUnidad * item.cantidad;
            productosValidados.push({ nombre: item.nombre, cantidad: item.cantidad, precio: pStock.precioUnidad });

            pStock.unidadesStock -= item.cantidad;
            await pStock.save();
        }

        // 2. Crear el objeto Pedido primero
        const nuevoPedido = new Pedido({
            cliente: cliente.toUpperCase(),
            direccion: direccion.toUpperCase(),
            productos: productosValidados,
            total: 0, // Calcularemos luego
            fragil: esFragil,
            fechaEntrega: dayjs().add(3, 'day').toDate()
        });

        // 3. Ahora generar los cálculos y la factura
        const descuento = baseImponible >= 100 ? 0.05 : 0;
        const importeDescuento = baseImponible * descuento;
        const totalConDescuento = baseImponible - importeDescuento;
        const importeIVA = totalConDescuento * IVA_VAL;
        const totalFinal = totalConDescuento + importeIVA;

        nuevoPedido.total = totalFinal.toFixed(2);
        await nuevoPedido.save();

        // 4. Generar la factura visual
        const lineas = generarFacturaLineas(productosValidados);
        const facturaVisual = `
=======================================================
      🌿 TIENDA ECOLÓGICA — RESUMEN DEL PEDIDO 🌿
=======================================================
CLIENTE:       ${nuevoPedido.cliente}
DIRECCIÓN:     ${nuevoPedido.direccion}
FECHA PEDIDO:  ${dayjs().format('YYYY-MM-DD')}
FECHA ENTREGA: ${dayjs(nuevoPedido.fechaEntrega).format('YYYY-MM-DD')}
FRÁGIL:        ${esFragil ? "⚠️ SÍ" : "NO"}
-------------------------------------------------------
PRODUCTOS
${lineas}
-------------------------------------------------------
BASE IMPONIBLE:   ${baseImponible.toFixed(2)}€
DESCUENTO:       -${importeDescuento.toFixed(2)}€ (${descuento*100}%)
IVA (21%):        ${importeIVA.toFixed(2)}€
-------------------------------------------------------
TOTAL A PAGAR:    ${totalFinal.toFixed(2)}€
=======================================================
`;
        res.status(201).json({ facturaVisual });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerCatalogoDisponible = async (req, res) => {
    try {
        // Buscamos productos donde unidadesStock sea mayor que 0
        const productos = await Stock.find({ unidadesStock: { $gt: 0 } })
                                    .select('nombreProducto precioUnidad unidadesStock');
        
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el catálogo", error });
    }
};

module.exports = { comprobarDisponibilidad, finalizarPedido, obtenerCatalogoDisponible};