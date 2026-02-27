const dayjs = require("dayjs");

const IVA = 1.21;
let totalCarrito = 0;

let nombreCliente = "Paquito Perez";
let direccionCliente = "Su calle";
let telefonoCliente = "987-4534598";
let stock = true;
let descuento = 0;
let fechaEntrega = dayjs().add(3, 'day').format('YYYY-MM-DD');

const productos = [
  { nombre: "Bolsa Reutilizable de Algodón", precio:   9.99, cantidad: 120 },
  { nombre: "Botella de Acero Inoxidable",   precio:  24.99, cantidad:  80 },
  { nombre: "Jabón Natural de Lavanda",      precio:   7.50, cantidad: 150 },
  { nombre: "Cepillo de Dientes de Bambú",   precio:   4.99, cantidad: 200 },
  { nombre: "Cera de Abeja para Envolver",   precio:  12.99, cantidad:  90 },
  { nombre: "Shampoo Sólido Orgánico",       precio:  11.99, cantidad: 110 },
  { nombre: "Vela de Soja Aromática",        precio:  14.99, cantidad:  60 },
  { nombre: "Cuaderno de Papel Reciclado",   precio:   6.99, cantidad: 175 },
  { nombre: "Kit de Cubiertos de Bambú",     precio:  18.99, cantidad:  70 },
  { nombre: "Filtro de Agua Reutilizable",   precio:  34.99, cantidad:  45 },
];

let clienteNormalizado = nombreCliente.toUpperCase();
let direccionNormalizado = direccionCliente.toUpperCase();
let telefonoNormalizado = telefonoCliente.replace("-","");

let tieneProductFragil = productos.includes(producto => producto.nombre.lowerCase().includes("fragil"));

function comprobarStock(productos) {
    if (!stock) {
        console.log("No hay stock disponible para este pedido")
        return false;
    }
    return productos.every(producto => producto.cantidad > 0);
}

function tieneDescuento(totalCarrito) {
    if (totalCarrito >= 100) {
        return 0.05;
    } else {
        return 0;
    }
}

function calcularTotal(totalCarrito, descuento) {
    const calculoDescuento = totalCarrito * descuento;
    const calculoTotal = totalCarrito + calculoDescuento;
    const totalConIVA = calculoTotal * IVA;
    return totalConIVA
}

function entregarPedido() {
    if (comprobarStock(productos)) {
        const descuentoAplicado = tieneDescuento(totalCarrito);
        const total = calcularTotal(totalCarrito, descuentoAplicado);
        console.log(`Pedido entregado a ${clienteNormalizado} en ${direccionNormalizado}. Total a pagar: ${total}. Fecha de entrega: ${fechaEntrega}`)
    }
}