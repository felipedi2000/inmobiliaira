# Proyecto React & Spring Boot - Inmobiliaria

Este proyecto es una aplicación web desarrollada con React en el frontend y Spring Boot en el backend. Su propósito es gestionar usuarios y arriendos para una inmobiliaria.

## Tecnologías Utilizadas

### Frontend (React)
- React 18+
- React Router
- Axios (para peticiones HTTP)
- Tailwind CSS / Bootstrap (opcional, dependiendo de la UI utilizada)
- Context API (para manejo de estado)
- Vite (para empaquetado)

### Backend (Spring Boot)
- Java 17+
- Spring Boot 3+
- Spring Data JPA
- Spring Security (si aplica)
- Hibernate
- MySQL / PostgreSQL (dependiendo de la base de datos utilizada)
- Swagger (para documentación de la API)
- Gradle (para gestión de dependencias y compilación)

## Instalación y Configuración

### Requisitos Previos
- Node.js 16+
- Java 17+
- Gradle
- MySQL / PostgreSQL (o la base de datos que uses)

### Configuración del Backend
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```
2. Acceder al directorio del backend:
   ```sh
   cd backend
   ```
3. Configurar las credenciales de la base de datos en `application.properties` o `application.yml`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/tu_base_datos
   spring.datasource.username=tu_usuario
   spring.datasource.password=tu_contraseña
   spring.jpa.hibernate.ddl-auto=update
   ```
4. Compilar y ejecutar el backend:
   ```sh
   gradle bootRun
   ```

### Configuración del Frontend
1. Acceder al directorio del frontend:
   ```sh
   cd frontend
   ```
2. Instalar las dependencias:
   ```sh
   npm install
   ```
3. Construir el frontend con Vite:
   ```sh
   npm run build
   ```
4. Copiar los archivos generados a la carpeta de recursos estáticos de Spring Boot:
   ```sh
   cp -r dist/* ../backend/src/main/resources/static/
   ```
5. Iniciar el backend y acceder a la aplicación en `http://localhost:8282/`.

## Uso
- Acceder a `http://localhost:8282/` para ver la aplicación.

## Ejecucion
- Ejecutar .jar en carpeta build/libs


