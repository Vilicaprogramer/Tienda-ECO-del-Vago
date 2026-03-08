# 🌿 Tienda Ecológica Web (EcoStore API)

¡Bienvenido al repositorio de nuestra **Tienda Ecológica**! Este proyecto ha sido desarrollado como parte de nuestra primera entrega de aplicaciones web en entorno servidor. La aplicación gestiona pedidos, controla el inventario en tiempo real y calcula facturas detalladas automáticamente.



## 🚀 Características principales
* **Gestión de Stock:** Validación en tiempo real para evitar vender productos agotados.
* **Carrito Inteligente:** Permite ajustes de cantidad si el stock disponible es menor a lo deseado.
* **Cálculo de Facturas:** Generación de resúmenes económicos con IVA y descuentos aplicados.
* **Lógica de Envío:** Cálculo automático de fechas de entrega (+3 días) y detección de productos frágiles.

## 🛠️ Tecnologías utilizadas
* **Backend:** Node.js con Express.
* **Base de Datos:** MongoDB (gestión de dos colecciones separadas: `Pedidos` y `Stock`).
* **ORM:** Mongoose.
* **Utilidades:** Day.js para el manejo profesional de fechas.

## 📁 Estructura del Proyecto
```text
Tienda-ECO/
├── src/
│   ├── controllers/   # Lógica del negocio
│   ├── models/        # Esquemas de Mongoose
│   └── app.js         # Servidor Express
├── public/            # Frontend (HTML/CSS/JS)
├── .env               # Variables de entorno
└── package.json       # Dependencias
```