const Pedidos = require('../models/Pedidos'); // Importamos el modelo creado con el Schema

// 1. Array con los 20 productos eco
const pedidosEco = [
    {
        cliente: "CARLA RODRIGUEZ",
        direccion: "Calle 1",
        productos: [
            { nombre: "Botella Acero Inoxidable 750ml", cantidad: 2, precio: 22.90 },
            { nombre: "Bolsa Reutilizable Algodón", cantidad: 3, precio: 8.50 }
        ],
        total: 71.30,
        fragil: false,
        fechaPedido: new Date('2024-03-01'),
        fechaEntrega: new Date('2024-03-04')
    },
    {
        cliente: "MARCOS LOPEZ",
        direccion: "Calle 2",
        productos: [
            { nombre: "Tarro de Cristal Hermético", cantidad: 5, precio: 12.50 },
            { nombre: "Fiambrera de Vidrio y Bambú", cantidad: 1, precio: 18.50 }
        ],
        total: 81.00,
        fragil: true, // Contiene cristal y vidrio
        fechaPedido: new Date('2024-03-02'),
        fechaEntrega: new Date('2024-03-05')
    },
    {
        cliente: "ANTONIO GARCIA",
        direccion: "Calle 3",
        productos: [
            { nombre: "Champú Sólido de Romero", cantidad: 1, precio: 11.95 },
            { nombre: "Cepillo de Dientes Bambú Adulto", cantidad: 4, precio: 3.90 },
            { nombre: "Esponja de Luffa Natural", cantidad: 2, precio: 4.50 }
        ],
        total: 36.55,
        fragil: false,
        fechaPedido: new Date('2024-03-05'),
        fechaEntrega: new Date('2024-03-08')
    },
    {
        cliente: "LUCIA FERNANDEZ",
        direccion: "Calle 4",
        productos: [
            { nombre: "Aceite de Argán Puro 50ml", cantidad: 2, precio: 19.90 },
            { nombre: "Vela Cera de Soja y Lavanda", cantidad: 2, precio: 16.80 }
        ],
        total: 73.40,
        fragil: true, // El aceite suele venir en envase frágil y las velas también
        fechaPedido: new Date('2024-03-06'),
        fechaEntrega: new Date('2024-03-09')
    },
    {
        cliente: "BEATRIZ SANCHEZ",
        direccion: "Calle 5",
        productos: [
            { nombre: "Copa Menstrual de Silicona", cantidad: 1, precio: 24.50 },
            { nombre: "Pack Discos Desmaquillantes Tela", cantidad: 1, precio: 13.20 },
            { nombre: "Jabón Artesano de Caléndula", cantidad: 5, precio: 7.20 }
        ],
        total: 73.70,
        fragil: false,
        fechaPedido: new Date('2024-03-07'),
        fechaEntrega: new Date('2024-03-10')
    }
];

// 2. Función lógica de inserción
const seedDB = async () => {
    try {
        // Conexión manual para el script
        await Pedidos.db.asPromise();
        console.log("Conectado a la base de datos de Pedidos...");

        // Limpieza: Borra lo anterior para no duplicar datos
        await Pedidos.deleteMany({});
        console.log("Colección de pedidos vaciada.");

        // Ingesta: Inserta el array completo de una vez
        await Pedidos.insertMany(pedidosEco);
        console.log(`${pedidosEco.length} pedidos insertados con éxito.`);

    } catch (error) {
        console.error("Error en la semilla:", error);
    } finally {
        // Desconexión: Cerramos siempre al terminar o fallar
        await Pedidos.db.close();
        console.log("Conexión cerrada.");
    }
};

// 3. Ejecución del script
seedDB();
