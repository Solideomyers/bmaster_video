# Backend de Gestión de Videos

![Express](https://img.shields.io/badge/Express-4.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![TypeORM](https://img.shields.io/badge/TypeORM-0.x-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13.x-blue)
![JWT](https://img.shields.io/badge/JWT-8.x-green)
![BCrypt](https://img.shields.io/badge/BCrypt-5.x-blue)
![Swagger](https://img.shields.io/badge/Swagger-4.x-orange)
![Jest](https://img.shields.io/badge/Jest-27.x-red)

Este es un backend para gestionar videos desarrollado con Express, TypeScript, TypeORM, PostgreSQL, JWT, BCrypt, Swagger y Jest.

## Contribuyente

- [Francisco Myers](https://github.com/solideomyers)
- [Linkedin]([https://github.com/solideomyers](https://www.linkedin.com/in/franciscomyers/))

## User Stories

Como usuario, debo poder realizar las siguientes acciones:

- Registrarme como usuario.
- Actualizar mi información de usuario.
- Eliminar mi cuenta de usuario.
- Obtener información de usuario por ID.
- Obtener una lista de todos los usuarios.
- Crear un nuevo video.
- Actualizar la información de un video.
- Obtener una lista de todos los videos.
- Obtener información de un video por ID.
- Darle "like" a un video.

## Instrucciones de Inicio

1. Clona el repositorio:

```bash
git clone https://github.com/Solideomyers/bmaster_video.git
```

2. Define tus varibles de entorno:

```bash
PORT=3000

# databasee
DB_USER=''
DB_PASSWORD=''
DB_LOCALHOST='localhost'
DB_NAME=''
DB_PORT=5432

# JWT
JWT_SEED='secret'
```
3. Ejecuta:

```bash
npm install
```

```bash
npm start
```
4. Swagger:

```bash
visita la ruta /api-docs/
```
