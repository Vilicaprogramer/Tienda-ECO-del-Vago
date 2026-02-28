const dayjs = require("dayjs");

const IVA = 1.21;

let nombreCliente = "Paquito Perez";
let direccionCliente = "Su calle";
let telefonoCliente = "987-4534598";
let stock = true;
let fechaEntrega = dayjs().add(3, 'day').format('YYYY-MM-DD');

const productosPedido = [
  { nombre: "Bolsa Reutilizable de Algodón", precio:   9.99, cantidad: 120 },
  { nombre: "Botella de Acero Inoxidable",   precio:  24.99, cantidad:  80 },
  { nombre: "Jabón Natural de Lavanda",      precio:   7.50, cantidad: 150 },
  { nombre: "Cepillo de Dientes de Bambú",   precio:   4.99, cantidad: 200 },
  { nombre: "Cera de Abeja para Envolver",   precio:  12.99, cantidad:  90 },
  { nombre: "Shampoo Sólido Orgánico",       precio:  11.99, cantidad: 110 },
  { nombre: "Vela de Soja Aromática",        precio:  14.99, cantidad:  60 },
  { nombre: "Cuaderno de Papel Reciclado",   precio:   6.99, cantidad: 175 },
  { nombre: "Kit de Cubiertos de Bambú",     precio:  18.99, cantidad:  70 },
  { nombre: "Filtro de Agua Reutilizable (Fragil)",   precio:  34.99, cantidad:  45 },
];

let clienteNormalizado = nombreCliente.toUpperCase();
let direccionNormalizado = direccionCliente.toUpperCase();
let telefonoNormalizado = telefonoCliente.replace("-","");

let tieneProductFragil = productosPedido.some(producto => producto.nombre.toLowerCase().includes("fragil"));
function generarLineasProductos(productos) {
    let lineas = "";

    productos.forEach(function(producto) {
        const subtotal = producto.precio * producto.cantidad;
        lineas = lineas + "  - " + producto.nombre + ": €" + producto.precio.toFixed(2) + " x " + producto.cantidad + " uds = €" + subtotal.toFixed(2) + "\n    ";
    });

    return lineas;
}

function comprobarStock(productosPedido,stock) {
    if (!stock) {
        console.log("No hay stock disponible para este pedido");
        return false;
    }
    return productosPedido.every(producto => producto.cantidad > 0);
}

function calcularCarrito(productosPedido, stock) {
    if (comprobarStock(productosPedido, stock)) {
        return productosPedido.reduce((acc, producto) => {
            return acc + (producto.precio * producto.cantidad);
        },0);
    }
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
    const calculoTotal = totalCarrito - calculoDescuento;
    const totalConIVA = calculoTotal * IVA;
    return totalConIVA;
}


function entregarPedido() {
    if (!comprobarStock(productosPedido,stock)) return;

        const totalCarrito       = calcularCarrito(productosPedido, stock);
        const descuentoAplicado  = tieneDescuento(totalCarrito);
        const totalFinal         = calcularTotal(totalCarrito, descuentoAplicado);

        const baseImponible    = totalCarrito;
        const importeDescuento = baseImponible * descuentoAplicado;
        const importeIVA       = (baseImponible - importeDescuento) * (IVA - 1);

        
        const lineasProductos = generarLineasProductos(productosPedido);

        const factura = `
    ${"=".repeat(55)}
            🌿  TIENDA ECOLÓGICA — RESUMEN DEL PEDIDO  🌿
    ${"=".repeat(55)}

    DATOS DEL CLIENTE
    Cliente       : ${clienteNormalizado}
    Dirección     : ${direccionNormalizado}
    Teléfono      : ${telefonoNormalizado}
    Fecha pedido  : ${dayjs().format('YYYY-MM-DD')}
    Fecha entrega : ${fechaEntrega}
    Stock         : ${stock ? "✅ Disponible" : "❌ No disponible"}
    Frágil        : ${tieneProductFragil ? "⚠️  Sí" : "No"}

    ${"=".repeat(55)}
    PRODUCTOS
    ${"-".repeat(55)}
    ${lineasProductos}

    ${"=".repeat(55)}
    RESUMEN ECONÓMICO
    ${"-".repeat(55)}
    Base imponible  : €${baseImponible.toFixed(2)}
    Descuento (${(descuentoAplicado * 100).toFixed(0)}%) : -€${importeDescuento.toFixed(2)}
    IVA (21%)       :  €${importeIVA.toFixed(2)}
    ${"-".repeat(55)}
    TOTAL A PAGAR   :  €${totalFinal.toFixed(2)}
    ${"=".repeat(55)}
    Gracias por tu compra, ${clienteNormalizado}. ¡Cuidamos el planeta juntos! 🌍
    Tu pedido llegará el ${fechaEntrega}.
    ${"=".repeat(55)}
    `;

        return factura;
    }

console.log(entregarPedido());