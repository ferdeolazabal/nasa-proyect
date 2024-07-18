# NASA Application

This project uses React.js for the front-end and Node.js for the back-end. The application allows users to simulate creating trips to habitable exoplanets discovered by NASA, using data from the [Nasa Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/docs/data.html).

## Used Technologies

- React.js
- Node.js
- Express.js
- MongoDB
- Arwes (Futuristic science fiction UI)

## Getting Started

1. Ensure you have Node.js installed.
2. Create a free [Mongo Atlas](https://www.mongodb.com/atlas/database) database online or start a local MongoDB database.
3. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.
4. In the terminal, run: `npm install`

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs project dependencies for both front-end and back-end.

### `npm start`

Runs the app in development mode at http://localhost:8000.

### `npm run deploy`

Builds the app for production to the build folder and serves it at http://localhost:8000.

### `npm test`

Launches server-side tests.

## Features

- Scheduled trip creation to habitable planets.
- Selection of launch date and destination.
- Mission cancellation capability.
- View mission history.

# Aplicación Nasa

Este proyecto utiliza React.js para el front-end y Node.js para el back-end. La aplicación permite a los usuarios simular la creación de viajes a exoplanetas habitables descubiertos por la NASA, utilizando datos del [Nasa Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/docs/data.html).

## Tecnologías Utilizadas

- React.js
- Node.js
- Express.js
- MongoDB
- [Arwes](https://github.com/arwes/arwes) (Interfaz de ciencia ficción futurista)

## Scripts Disponibles

En el directorio del proyecto, puede ejecutar:

### `npm install`

Instala las dependencias del proyecto, tanto front-end como back-end

### `npm start`

Ejecuta la aplicación en modo de desarrollo en http://localhost:8000.

### `npm run deploy`

Construye la aplicación para producción en la carpeta `build` y la sirve en http://localhost:8000.

### `npm test`

Ejecuta tests en el servidor

## Funcionalidades

- Creación de viajes programados a planetas habitables.
- Selección de fecha de lanzamiento y destino.
- Posibiidad de cancelar misiones
- Ver historial de misiones
