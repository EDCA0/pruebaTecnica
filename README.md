# API de Gestión de Libros

API RESTful para la gestión de una biblioteca de libros, construida con Node.js, Express, TypeScript y PostgreSQL, y contenerizada con Docker.

📍 Índice / Navegación

- [Acerca del Proyecto](#acerca-del-proyecto)
- [Características Clave](#caracteristicas-clave)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estructura](#estructura-del-proyecto)
- [Instrucciones](#instrucciones)
- [Endpoints](#endpoints-de-la-api)
- [Persistencia de datos](#persistencia-de-datos-de-la-base-de-datos)
- [Atributos y Restricciones de la Tabla books](#atributos-y-restricciones-de-la-tabla-books)

## Acerca del Proyecto

Este proyecto es una API RESTful robusta y escalable diseñada para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de libros. Fue desarrollado como una prueba técnica para demostrar competencias en el desarrollo backend con un stack moderno, siguiendo las mejores prácticas de arquitectura de software, validación de datos y manejo de errores.

La API permite a los clientes gestionar una base de datos de libros, interactuando a través de endpoints HTTP bien definidos y utilizando un formato de respuesta JSON estandarizado para facilitar la integración con cualquier tipo de cliente (web, móvil, etc.).

## Caracteristicas Clave

API RESTful Completa: Endpoints para operaciones CRUD (POST, GET, PATCH, PUT, DELETE).

Validación de Datos Avanzada: Uso de class-validator y class-transformer a través de DTOs para garantizar la integridad de los datos de entrada antes de que lleguen a la lógica de negocio.

Manejo de Errores Centralizado: Middlewares dedicados que capturan, registran y formatean errores de forma consistente, devolviendo mensajes claros al cliente.

ORM y Migraciones: Gestión de la base de datos con TypeORM, permitiendo un mapeo objeto-relacional claro y un sistema de migraciones para versionar el esquema de la base de datos de forma segura.

Entorno Contenerizado: Configuración de docker-compose para levantar una instancia de PostgreSQL con un solo comando, garantizando un entorno de desarrollo consistente y aislado.

Arquitectura Modular: El código fuente está organizado por responsabilidades (rutas, servicios, DTOs, entidades), facilitando la mantenibilidad y escalabilidad del proyecto.

## 🚀Tecnologias Utilizadas

| Tecnología        | Descripción                                                                          |
| :---------------- | :----------------------------------------------------------------------------------- |
| Node.js           | Entorno de ejecución de JavaScript del lado del servidor.                           |
| Express.js        | Framework minimalista para construir la API y gestionar las rutas y middlewares.     |
| TypeScript        | Superset de JavaScript que añade tipado estático para un código más robusto y mantenible. |
| PostgreSQL        | Sistema de gestión de bases de datos relacional, potente y de código abierto.       |
| TypeORM           | ORM (Object-Relational Mapper) para interactuar con la base de datos PostgreSQL de forma orientada a objetos. |
| Docker            | Plataforma de contenerización para crear y ejecutar la base de datos en un entorno aislado. |
| class-validator   | Librería para la validación de objetos basada en decoradores, usada en los DTOs.   |
| dotenv            | Módulo para cargar variables de entorno desde un archivo .env.                     |

## 📂Estructura del Proyecto

* `.` (Raíz del proyecto)
    * `.env.example`: Archivo de ejemplo para las variables de entorno.
    * `.gitignore`: Archivo para especificar archivos y directorios a ignorar por Git.
    * `docker-compose.yml`: Configuración de Docker Compose para los servicios del proyecto (ej. base de datos).
    * `package.json`: Manifiesto del proyecto y scripts de Node.js.
    * `src/`: Directorio principal con el código fuente de la aplicación.
        * `app.ts`: Configuración principal de Express (middlewares, rutas).
        * `db.ts`: Configuración de la conexión a la base de datos con TypeORM.
        * `index.ts`: Punto de entrada de la aplicación, inicializa el servidor.
        * `dtos/`: Data Transfer Objects (DTOs): definen la forma de los datos de entrada y salida.
        * `entities/`: Entidades de TypeORM: definen el esquema de la base de datos.
        * `middlewares/`: Middlewares de Express (ej. manejo de errores, validación, autenticación).
        * `migrations/`: Archivos de migración de TypeORM generados automáticamente para controlar cambios en el esquema de la DB.
        * `models/`: Interfaces y enumeraciones de TypeScript para el tipado de datos y modelos de dominio.
        * `routes/`: Definición de las rutas de la API (endpoints).
        * `services/`: Lógica de negocio de negocio de la aplicación (core de las operaciones).
        * `utils/`: Utilidades y clases de ayuda (ej. clases de error HTTP personalizadas, funciones auxiliares).

---

## Instrucciones

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

1. Prerrequisitos
Asegúrate de tener instalado el siguiente software:

Node.js (v18.x o superior)

NPM (v9.x o superior)

Docker Desktop (v20.x o superior) 

2. Configuración del Proyecto
Clona el repositorio:

```
git clone https://github.com/EDCA0/pruebaTecnica.git
cd pruebaTecnica
Instala las dependencias:
Este comando leerá el package.json e instalará todas las librerías necesarias.
```

```
npm install
Configura las variables de entorno:
Crea un archivo .env a partir del ejemplo. Los valores por defecto están configurados para funcionar con el docker-compose.yml(Recomendado usar los que se encuentran ahi).
```

```
cp .env.example .env
```
3. Base de Datos
Inicia el contenedor de la base de datos:
Este comando leerá el docker-compose.yml, descargará la imagen de PostgreSQL y la ejecutará en segundo plano (-d).

```
docker-compose up -d postgres
```

En caso de que pida permisos para utilizar redes publicas y privadas debes darle en "permitir" o "aceptar" ya que esto sera lo que monte el servidor que usaremos para los datos(manejarlos y almacenarlos)
Puedes verificar que el contenedor está corriendo usando el comando docker ps en la terminal. Deberías ver un contenedor con el nombre postgres.

Ejecuta las migraciones:
Este comando se conecta a la base de datos que acabas de crear y ejecuta los archivos de la carpeta migrations/ para crear la tabla books y sus columnas.

``` 


npm run migration:run
```

4. Ejecución de la Aplicación
Inicia el servidor en modo de desarrollo:


```
npm run dev
```

El servidor se iniciará en http://localhost:3000 y se reiniciará automáticamente cada vez que hagas un cambio en los archivos .ts. ¡Ya estás listo para probar los endpoints!

## Endpoints de la API
A continuación se detalla cada endpoint disponible en la API. (Para esto debes tener un cliente REST, como por ejemplo Insombia)

**RECUERDA QUE EN CASO DE NO CAMBIAR LOS DATOS DE INGRESO A LA BASE DE DATOS ESTOS ESTARAN EN EL ARCHIVO db.ts como valores predeterminados**

### `POST /v1/books`
Crea un nuevo libro en la base de datos.

**Ejemplo de Uso:**

```bash
 POST http://localhost:3000/v1/books 
- Request Body
'{ "title": "Cien años de soledad", "author": "Gabriel García Márquez", "year": 1967, "genre": "Fantasía" }
```
| Campo     | Típo      | Descripción |   Requerido    |
| :-------- | :-------- | :-------- | :--------------|
| title   | string  | Titulo del libro. Debe tener entre 5 y 100 caracteres   |      Sí       |
| author   | string   |  Nombre del autor. Debe tener entre 3 y 80 caracteres  |      Sí       |
|year | number| Año de publicación. Debe ser un número entero entre 1455 y el año actual. | Sí|
|genre|string|Género literario. Debe ser uno de los valores permitidos (ej. Fantasía, Misterio, Ciencia Ficción, etc.).| Sí|

Respuesta Exitosa (201 Created):

```
JSON
{
    "success": true,
    "statusCode": 201,
    "data": {
        "title": "Cien años de soledad",
        "author": "Gabriel García Márquez",
        "year": 1967,
        "genre": "Fantasía",
        "id": 1
    }
}
```

Posibles Errores y Soluciones:

|Código| Error| Causa Posible| Solución|
|:-----|:-----|:-------------|:--------|
|400|Bad Request| El cuerpo de la petición no es un JSON válido o alguno de los campos no pasa la validación (ej. title demasiado corto, year en el futuro, genre inválido). | Revisa que el JSON esté bien formado y que todos los campos cumplan con las reglas definidas en la tabla de arriba. El mensaje de error te dirá exactamente qué campo falló.|
|500 | Internal Server Error | Error de conexión con la base de datos o un fallo inesperado en el servidor.| Asegúrate de que el contenedor de Docker esté corriendo (docker ps). Si el problema continúa, revisa los logs de la consola del servidor para más detalles.|

GET /v1/books
Obtiene una lista de todos los libros almacenados.

**Ejemplo de Uso:**

```
Bash
GET http://localhost:3000/v1/books
```

Respuesta Exitosa (200 OK):

```
JSON

{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "id": 1,
            "title": "Cien años de soledad",
            "author": "Gabriel García Márquez",
            "year": 1967,
            "genre": "Fantasía"
        },
        {
            "id": 2,
            "title": "El Quijote de la Mancha",
            "author": "Miguel de Cervantes",
            "year": 1605,
            "genre": "Aventura"
        }
    ]
}
```

Posibles Errores y Soluciones:

| Código | Error |Causa Posible | Solución|
|:-------|:------|:-------------|:--------|
|500 |Internal Server Error | Error de conexión con la base de datos.| Verifica que el contenedor de Docker con PostgreSQL esté activo (docker ps).|

GET /v1/books/:id
**Ejemplo de Uso:**
```
Bash
GET http://localhost:3000/v1/books/1               //el ultimo numero es el id del libro que se quiere consultar
```
Respuesta Exitosa (200 OK):

```
JSON

{
    "success": true,
    "statusCode": 200,
    "data": {
        "id": 1,
        "title": "Cien años de soledad",
        "author": "Gabriel García Márquez",
        "year": 1967,
        "genre": "Fantasía"
    }
}
```

Posibles Errores y Soluciones:

|Código | Error |Causa Posible  |Solución|
|:------|:------|:--------------|:-------|
|404 | Not Found |El id proporcionado en la URL no corresponde a ningún libro en la base de datos. | Verifica que el id es correcto. Puedes hacer un GET /v1/books para ver los IDs disponibles.|
|500 | Internal Server Error|  Error de conexión con la base de datos. | Verifica que el contenedor de Docker con PostgreSQL esté activo (docker ps).|

PATCH /v1/books/:id
Actualiza parcialmente un libro existente. Solo necesitas enviar los campos que deseas cambiar.

**Ejemplo de Uso:**
```
Bash
  PATCH http://localhost:3000/v1/books/1 \               //el ultimo numero es el id del libro que se quiere MODIFICAR
-d '{
  "year": 1968,
  "title": "Cien años de soledad (Edición Revisada)"
}'
```
**Cuerpo de la Petición (Request Body):**
Acepta cualquier subconjunto de los campos de un libro. Todos los campos son opcionales.

|Campo| Tipo | Descripción|
|title| string | Nuevo titulo del libro (5-100 caracteres).|
|author| string| Nuevo nombre del autor (3-80 caracteres).|
|year| number | Nuevo año de publicacion (entero, >=1455). |
|genre | string | Nuevo género del libro (Debe ser un valor del enum GeneroLibro).

Respuesta Exitosa (200 OK):
Devuelve el objeto completo del libro con los campos actualizados.

```
JSON
{
    "success": true,
    "statusCode": 200,
    "data": {
        "id": 1,
        "title": "Cien años de soledad (Edición Revisada)",
        "author": "Gabriel García Márquez",
        "year": 1968,
        "genre": "Fantasía"
    }
}
```

Posibles Errores y Soluciones:

|Código | Error | Causa Posible | Solución|
|:------|:------|:--------------|:--------|
|400| Bad Request | Algún campo enviado en el cuerpo de la petición no pasa la validación. | Asegúrate de que los campos que envías cumplen con las reglas de validación (longitud, tipo, etc.).|
|400 | Not Found | El id proporcionado en la URL no existe | verifica que el id sea correcto|
|500| Internal Server Error | Error de conexión con la base de datos | Verifica que el contenedor de Dcocker esté activo (docker ps)|

PUT /v1/books/:id
Reemplaza completamente un libro existente. Debes enviar todos los campos del libro, incluso si no cambian.

**Ejemplo de Uso :**

```
Bash
PUT http://localhost:3000/v1/books/1 \               //el ultimo numero es el id del libro que se quiere MODIFICAR
-d '{
    "title": "Cien años de soledad (Edición Definitiva)",
    "author": "Gabo",
    "year": 1969,
    "genre": "Realismo Mágico"
}'
```

Cuerpo de la Petición (Request Body):
Es idéntico al de POST, todos los campos son requeridos.
| Campo     | Típo      | Descripción |   Requerido    |
| :-------- | :-------- | :-------- | :--------------|
| title   | string  | Titulo del libro. Debe tener entre 5 y 100 caracteres   |      Sí       |
| author   | string   |  Nombre del autor. Debe tener entre 3 y 80 caracteres  |      Sí       |
|year | number| Año de publicación. Debe ser un número entero entre 1455 y el año actual. | Sí|
|genre|string|Género literario. Debe ser uno de los valores permitidos (ej. Fantasía, Misterio, Ciencia Ficción, etc.).| Sí|

Respuesta Exitosa (200 OK):
Devuelve el objeto completo del libro reemplazado.

```
JSON
{
    "success": true,
    "statusCode": 200,
    "data": {
        "id": 1,
        "title": "Cien años de soledad (Edición Definitiva)",
        "author": "Gabo",
        "year": 1969,
        "genre": "Realismo Mágico"
    }
}
```

Posibles Errores y Soluciones:
Son los mismos que para PATCH, con la diferencia de que el 400 Bad Request se producirá si falta alguno de los campos requeridos en el cuerpo de la petición.

|Código | Error | Causa Posible | Solución |
|:------|:------|:--------------|:---------|
|400| Bad Request| Algún campo enviado en el cuerpo de la petición no pasa la validación, o falta algún campo requerido| Verifica que el id es correcto|
|400 |Not found | El id proporcionado en la URL no existe | Verifica que el id es correcto|
|500 | Internal Server Error | Error de conexión con la base de datos | Verifica que el contenedor de Docker esté activo (docker ps)|

DELETE /v1/books/:id
Elimina un libro de la base de datos por su id.

**Ejemplo de Uso:**

```
Bash
DELETE http://localhost:3000/v1/books/1                //el ultimo numero es el id del libro que se quiere ELIMINAR
```

Respuesta Exitosa (204 No Content):
Una respuesta exitosa no devuelve contenido en el cuerpo. Solo el código de estado 204 indica que la operación se completó.

Posibles Errores y Soluciones:
|Código | Error | Causa Posible | Solución |
|:------|:------|:--------------|:---------|
|404 | Not Found | El id proporcionado en la URL no existe | Verifica que el id es correcto. La operación no se puede completar si el libro ya fue borrado o nunca existió |
|500| Internal Several Error | Error de conexión con la base de datos. | Verifica que el contenedor de Docker esté activo (docker ps).|

## Persistencia de Datos de la Base de Datos

Para asegurar que los datos de tu base de datos PostgreSQL persistan incluso si los contenedores de Docker son eliminados o recreados, utilizamos **volúmenes de Docker**.

**¿Cómo funciona?**

En el archivo `docker-compose.yml`, se define un volumen llamado `db-data` (o el nombre que le hayas dado) que se "monta" en el directorio `/var/lib/postgresql/data` dentro del contenedor de PostgreSQL. Este es el lugar donde PostgreSQL almacena sus archivos de datos.

```
yaml
# Fragmento de docker-compose.yml
services:
  db:
    # ... otras configuraciones
    volumes:
      - db-data:/var/lib/postgresql/data # <--- Esto asegura la persistencia

volumes:
  db-data: # <--- Definición del volumen
```

Al declarar db-data: bajo la sección volumes: al final del docker-compose.yml, Docker crea un volumen gestionado por Docker en tu sistema host. Este volumen es un área de almacenamiento persistente que no está ligada al ciclo de vida de un contenedor individual.

Ubicación del Almacenamiento:

En Linux: Los volúmenes de Docker suelen almacenarse en /var/lib/docker/volumes/ en el sistema de archivos del host.

En macOS/Windows (con Docker Desktop): Docker Desktop gestiona una máquina virtual (VM) donde reside el motor de Docker. Los volúmenes se almacenan dentro de esa VM. No accedes a ellos directamente desde el sistema de archivos de tu macOS/Windows, pero Docker Desktop los gestiona por ti y son persistentes.
Esto significa que puedes detener, eliminar y volver a iniciar tus contenedores de base de datos, y tus datos (los libros que hayas guardado, etc.) seguirán estando disponibles en la siguiente ejecución.

## Atributos y Restricciones de la Tabla books

La tabla books en la base de datos tendrá los siguientes atributos basados en la entidad Book:

|Atributo| Tipo SQL | Restricciones | Descripción |
|:-------|:---------|:--------------|:------------|
|id | UUID| Clave Primaria, Generado Automáticamente | Identificador único del libro|
|title| VARCHAR(255) | NOT NULL| Título del libro|
|author | VARCHAR(255) | NOT NULL | Nombre completo del autor|
|year | INTEGER | NOT NULL | Año de publicación del libro|
|genre|VARCHAR(50) | NOT NULL| Género literario del libro|
