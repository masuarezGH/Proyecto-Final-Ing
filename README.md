# 🛒 E‑Commerce App (React Native + FakeStoreAPI)

Aplicación móvil de e‑commerce desarrollada en **React Native (Expo)** como trabajo práctico final.  
Consume la [FakeStoreAPI](https://fakestoreapi.com/docs#tag/Products) para simular un flujo completo de CRUD de productos.

---

## 🚀 Características principales

- **Listado de productos** con imágenes, precios y categorías.  
- **Detalle de producto** con descripción completa.  
- **Agregar producto** mediante formulario validado con Formik + Yup.  
- **Editar producto** reutilizando el mismo formulario.  
- **Eliminar producto** con confirmación.  
- **Estilo profesional** con [React Native Paper](https://callstack.github.io/react-native-paper/) (Material Design).  
- **Buenas prácticas**: modularización, componentes reutilizables, tipado fuerte con TypeScript.

---

## 📂 Estructura del proyecto
```
commerce-fakestore/
├── api/                # Servicios de API (fetch/axios)
│   └── products.ts
├── assets/             # Imágenes, íconos y recursos estáticos
├── components/         # Componentes reutilizables
    └── ProductCard.txs
    └── ProductForm.tsx
├── context/            # Contextos globales (ej: NotificationContext)
│   └── NotificationContext.tsx
├── hooks/              # Custom hooks para lógica reutilizable
│   ├── useProduct.ts
│   └── useProducts.ts
├── navigation/         # Configuración de navegación
│   └── AppNavigator.tsx
 ├── screens/            # Pantallas principales del flujo
│   ├── ProductListScreen.tsx
│   ├── ProductDetailScreen.tsx
│   ├── ProductAddScreen.tsx
│   ├── ProductEditScreen.tsx
│   └── ProductDeleteScreen.tsx
├── types/              # Tipos TypeScript
│   └── product.ts
├── App.js              # Punto de entrada principal
```

---

## 🛠️ Tecnologías utilizadas

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [React Navigation](https://reactnavigation.org/)  
- [React Native Paper](https://callstack.github.io/react-native-paper/)  
- [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup)  

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
   cd ecommerce-fakestore
2. Instalar dependencias:
   ```bash
   npm install
3. Ejecutar en modo desarrollo:
   ```bash
   npx expo start
4. Abrir en:

* Expo Go (Android/iOS) escaneando el QR.

* Emulador Android (a en la terminal).

* Simulador iOS (i en la terminal, solo en Mac).

---

## 📱 Pantallas incluidas
* Productos → lista de todos los productos.

* Detalle → información completa de un producto.

* Agregar → formulario para crear un nuevo producto.

* Editar → formulario para modificar un producto existente.

* Eliminar → confirmación y borrado de producto.

---

## 🔗 API utilizada
* [FakeStoreAPI](https://fakestoreapi.com/docs#tag/Products)
* Endpoints principales:

  ```http
  GET /products        → listar productos
  GET /products/:id    → detalle de producto
  POST /products       → agregar producto
  PUT /products/:id    → editar producto
  DELETE /products/:id → eliminar producto

 ⚠️ Nota: la API es de prueba, por lo que los cambios (crear/editar/eliminar) no persisten realmente. La app actualiza el estado local para simular el flujo completo.

---

## 👨‍💻 Autor
Trabajo práctico individual desarrollado por Marcos Suarez.
