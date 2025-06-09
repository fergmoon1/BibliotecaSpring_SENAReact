Biblioteca Application
Descripción
Esta aplicación es una biblioteca digital que permite gestionar libros, revistas y DVDs. Está dividida en un backend desarrollado con Spring Boot y un frontend creado con React. El backend proporciona una API REST para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar), mientras que el frontend ofrece una interfaz de usuario interactiva para administrar los elementos de la biblioteca.
Tecnologías Utilizadas

Backend: Spring Boot, Java, JPA/Hibernate, Spring Data JPA
Frontend: React, Axios, Tailwind CSS
Base de Datos: H2 (en memoria, para desarrollo)
Herramientas: Maven, Node.js, npm

Requisitos

Java 17 o superior
Node.js 14.x o superior
npm 6.x o superior
Maven 3.6.x o superior

Instalación
Backend

Clona el repositorio:git clone <URL_DEL_REPOSITORIO>
cd BibliotecaSpring


Configura la base de datos (H2 está incluida por defecto en application.properties).
Construye y ejecuta el proyecto:mvn spring-boot:run


El servidor estará disponible en http://localhost:8081.



Frontend

Navega al directorio del frontend:cd frontend


Instala las dependencias:npm install


Inicia la aplicación:npm start


El frontend estará disponible en http://localhost:3000.



Uso

Abre http://localhost:3000 en tu navegador.
Usa los botones de navegación para cambiar entre Libros, Revistas y DVDs.
Haz clic en "Crear Nuevo" para añadir un elemento, "Editar" para modificar uno existente, o "Eliminar" para borrarlo.
Los datos se sincronizan automáticamente con la API backend.

Estructura del Proyecto

src/main/java/edu/sena/bibliotecaspring/: Código del backend (controladores, servicios, repositorios, entidades).
src/main/resources/: Configuraciones y archivos estáticos del backend.
frontend/: Código del frontend (componentes React, estilos, etc.).

Endpoints de la API

GET /api/libros: Lista todos los libros.
POST /api/libros: Crea un nuevo libro.
PUT /api/libros/{id}: Actualiza un libro.
DELETE /api/libros/{id}: Elimina un libro.
(Similares para /api/revistas y /api/dvds).

Contribuciones
Si deseas contribuir, por favor:

Crea un fork del repositorio.
Crea una rama para tu característica (git checkout -b feature/nueva-caracteristica).
Realiza tus cambios y haz commit (git commit -m 'Descripción del cambio').
Envía un pull request.

Licencia
Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.
Agradecimientos

Desarrollado con la ayuda de xAI y la comunidad de desarrolladores de Spring y React.

