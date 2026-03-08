/* Importar la librería dayjs para manipular las fechas */
/* Parece ser que en  node se meten en constantes y se llaman con la función require */
const dayjs = require("dayjs");
/* Declaración de variables constantes para los valores que no queremos que muten y let para los que pueden modificarse durante la ejecución del código */
const IVA = 1.21;
/* Datos del cliente */
let nombreCliente = "Paquito Perez";
let direccionCliente = "Su calle";
let telefonoCliente = "987-4534598";
let stock = true;
let fechaEntrega = dayjs().add(3, 'day').format('YYYY-MM-DD'); /* Suma de 3 días a la fecha actual y formato en la que la queremos */
/* Pedido realizado por el cliente */
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
/* Normalización de los datos, nombre y dirección a mayusculas y teléfono sin guiones */
let clienteNormalizado = nombreCliente.toUpperCase();
let direccionNormalizado = direccionCliente.toUpperCase();
let telefonoNormalizado = telefonoCliente.replace("-","");
/* Variable que determina si algún producto contiene la palabra fragil para informarlo y avisar */
/* La función some comprueba si al menos un elemento de un array cumple con una condición 
establecida por una función de callback. Devuelve true inmediatamente al encontrar la primera coincidencia, deteniendo 
la iteración, o false si ningún elemento cumple la condición */
/* La función .includes() determina si un array o una cadena de texto (string) contiene un elemento o subcadena específica. 
Devuelve true si el valor existe y false si no, siendo sensible a mayúsculas y minúsculas. */
let tieneProductFragil = productosPedido.some(producto => producto.nombre.toLowerCase().includes("fragil"));
/* Función que lee las lineas de productos en el pedido, calcula el total individual y genera una string que sumaremos a la 
factura */
function generarLineasProductos(productos) {
    let lineas = "";

    productos.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        lineas = lineas + "  - " + producto.nombre + ": " + producto.precio.toFixed(2) + "€ x " + producto.cantidad + " uds = " + subtotal.toFixed(2) + "€\n    ";
    });

    return lineas;
}
/* Función que verifica que haya stock
- Faltaría un stock
- Faltaría que verificara que cada producto de ese stock fuera suficiente para cubrir el pedido del cliente
- Faltaría una función que anotara en cada linea del pedido si hay el stock completo, parcial o nada
- Faltaría una función que restara lo pedido por el clia¡ente al stock */
function comprobarStock(productosPedido,stock) {
    if (!stock) {
        console.log("No hay stock disponible para este pedido");
        return false;
    }
    return productosPedido.every(producto => producto.cantidad > 0);
}
/* Función que calcula el total del carrito */
/* La función .reduce() ejecuta una función callback sobre cada elemento de un array para acumularlos y devolver un único 
valor final (un número, objeto, string o nuevo array).*/
function calcularCarrito(productosPedido, stock) {
    if (comprobarStock(productosPedido, stock)) {
        return productosPedido.reduce((acc, producto) => {
            return acc + (producto.precio * producto.cantidad);
        },0);// Valor Inicial: Es fundamental definirlo (ej. 0 para sumas) para evitar errores con arrays vacíos
    }
}
/* Función que verifica si el total del pedido supera los 100€ para aplicar 5% de descuento o no */
function tieneDescuento(totalCarrito) {
    if (totalCarrito >= 100) {
        return 0.05;
    } else {
        return 0;
    }
}
/* Función que calcula el total del pedido en base a si tiene descuento o no más el coste de IVA */
function calcularTotal(totalCarrito, descuento) {
    const calculoDescuento = totalCarrito * descuento;
    const calculoTotal = totalCarrito - calculoDescuento;
    const totalConIVA = calculoTotal * IVA;
    return totalConIVA;
}

/* Función que principal que utiliza todas las funciones anterires y genera la factura que se imprimirá por pantalla */
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
    Base imponible  : ${baseImponible.toFixed(2)}€
    Descuento (${(descuentoAplicado * 100).toFixed(0)}%) : -${importeDescuento.toFixed(2)}€
    IVA (21%)       :  ${importeIVA.toFixed(2)}€
    ${"-".repeat(55)}
    TOTAL A PAGAR   :  ${totalFinal.toFixed(2)}€
    ${"=".repeat(55)}
    Gracias por tu compra, ${clienteNormalizado}. ¡Cuidamos el planeta juntos! 🌍
    Tu pedido llegará el ${fechaEntrega}.
    ${"=".repeat(55)}
    `;

        return factura;
    }

console.log(entregarPedido());