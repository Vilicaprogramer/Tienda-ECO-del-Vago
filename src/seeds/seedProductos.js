const Stock = require('../models/Productos'); // Importamos el modelo creado con el Schema

// 1. Array con los 20 productos eco
const productosEco = [
    { nombreProducto: "Bolsa Reutilizable Algodón", precioUnidad: 8.50, unidadesStock: 150, fragil: false },
    { nombreProducto: "Botella Acero Inoxidable 750ml", precioUnidad: 22.90, unidadesStock: 80, fragil: false },
    { nombreProducto: "Pack 4 Pajitas de Bambú", precioUnidad: 6.00, unidadesStock: 120, fragil: false },
    { nombreProducto: "Tarro de Cristal Hermético", precioUnidad: 12.50, unidadesStock: 45, fragil: true },
    { nombreProducto: "Jabón Artesano de Caléndula", precioUnidad: 7.20, unidadesStock: 90, fragil: false },
    { nombreProducto: "Champú Sólido de Romero", precioUnidad: 11.95, unidadesStock: 65, fragil: false },
    { nombreProducto: "Cepillo de Dientes Bambú Adulto", precioUnidad: 3.90, unidadesStock: 300, fragil: false },
    { nombreProducto: "Esponja de Luffa Natural", precioUnidad: 4.50, unidadesStock: 110, fragil: false },
    { nombreProducto: "Set Cubiertos de Madera Viaje", precioUnidad: 14.00, unidadesStock: 55, fragil: false },
    { nombreProducto: "Vela Cera de Soja y Lavanda", precioUnidad: 16.80, unidadesStock: 40, fragil: true },
    { nombreProducto: "Detergente Ecológico 1L", precioUnidad: 9.90, unidadesStock: 75, fragil: false },
    { nombreProducto: "Copa Menstrual de Silicona", precioUnidad: 24.50, unidadesStock: 30, fragil: false },
    { nombreProducto: "Pack Discos Desmaquillantes Tela", precioUnidad: 13.20, unidadesStock: 100, fragil: false },
    { nombreProducto: "Aceite de Argán Puro 50ml", precioUnidad: 19.90, unidadesStock: 25, fragil: true },
    { nombreProducto: "Bolsas de Malla para Fruta", precioUnidad: 5.80, unidadesStock: 200, fragil: false },
    { nombreProducto: "Estropajo de Coco", precioUnidad: 3.20, unidadesStock: 140, fragil: false },
    { nombreProducto: "Fiambrera de Vidrio y Bambú", precioUnidad: 18.50, unidadesStock: 35, fragil: true },
    { nombreProducto: "Protector Solar Mineral SPF30", precioUnidad: 21.00, unidadesStock: 50, fragil: false },
    { nombreProducto: "Taza de Café de Fibra de Arroz", precioUnidad: 10.50, unidadesStock: 85, fragil: true },
    { nombreProducto: "Bálsamo Labial de Karité", precioUnidad: 4.95, unidadesStock: 180, fragil: false }
];

// 2. Función lógica de inserción
const seedDB = async () => {
    try {
        // Conexión manual para el script (usa tu URI de stock)
        await Stock.db.asPromise();
        console.log("Conectado a la base de datos de Stock...");

        // Limpieza: Borra lo anterior para no duplicar datos
        await Stock.deleteMany({});
        console.log("Colección de productos vaciada.");

        // Ingesta: Inserta el array completo de una vez
        await Stock.insertMany(productosEco);
        console.log(`${productosEco.length} productos insertados con éxito.`);

    } catch (error) {
        console.error("Error en la semilla:", error);
    } finally {
        // Desconexión: Cerramos siempre al terminar o fallar
        await Stock.db.close();
        console.log("Conexión cerrada.");
    }
};

// 3. Ejecución del script
seedDB();
