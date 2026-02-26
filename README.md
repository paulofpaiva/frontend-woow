# Frontend Woow Technology

![Woow Technology](woow_logo.jpeg)

Este repositorio corresponde al frontend del assignment técnico solicitado por [WoowTechnology SAS](https://woowtechnologysas.com/) como parte del proceso de selección para la vacante de desarrollador de software.

Aplicación React para autenticación y perfil de usuario. Consume la API REST del proyecto [backend-woow](https://github.com/paulofpaiva/backend-woow) (login, perfil, listado de usuarios para admin).

## Descripción del proyecto

El frontend ofrece una página de login (email y contraseña), una página de perfil con edición de nombre y cierre de sesión, y redirección a login cuando el usuario no está autenticado. El token JWT se guarda en localStorage y se envía en las peticiones al backend.

## Prerrequisitos

* Node.js 18 o superior
* npm (incluido con Node)
* Backend Woow en ejecución (por defecto en `http://localhost:3000`)

## Instalación

1. Clonar el repositorio y entrar en la carpeta del proyecto.

2. Instalar dependencias:

```bash
npm install
```

3. Copiar el archivo de variables de entorno y ajustar si es necesario:

```bash
cp .env.example .env
```

En `.env` debes definir `VITE_API_URL` con la URL base del backend (por ejemplo `http://localhost:3000`). El backend debe permitir CORS desde el origen del frontend en desarrollo (por ejemplo `http://localhost:5173`).

## Cómo crear la base de datos

La base de datos se crea y migra al ejecutar el backend. Consulta el repositorio [backend-woow](https://github.com/paulofpaiva/backend-woow) para prerrequisitos (PostgreSQL), variables de entorno y comandos (`drizzle-kit push`, `drizzle-kit migrate` o equivalentes). Este frontend solo consume la API; no crea tablas ni datos.

## Cómo ejecutar el proyecto

**Modo desarrollo** (recarga al guardar):

```bash
npm run dev
```

La aplicación se sirve en `http://localhost:5173` por defecto (o el puerto que indique Vite).

**Modo producción** (compilar y previsualizar):

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
├── components/   # Componentes reutilizables (UI)
├── pages/        # Páginas (Login, Perfil, etc.)
├── services/     # Llamadas a la API
├── stores/       # Zustand (sesión/auth: token, user, persist)
├── types/        # Interfaces TypeScript
└── App.tsx       # Entry point, rutas y providers
```

## Credenciales de prueba

Tras ejecutar las migraciones y seeds del backend, puedes usar:

**Usuario administrador** (seed inicial del backend):

* Email: `admin@gmail.com`
* Contraseña: `12345678`
* Rol: `admin`

**Usuario normal** (seed de 50 usuarios; contraseña común `12345678`):

* Email: `maria.garcia@seed.local`
* Contraseña: `12345678`
* Rol: `user`

Otros usuarios del mismo seed: `juan.perez@seed.local`, `carlos.lopez@seed.local`, etc. Ver en el backend el archivo de seed (p. ej. `drizzle/0002_seed_50_users.sql`) para la lista completa.

## Endpoints consumidos por el frontend

El frontend consume la API REST del backend. Resumen (detalles y ejemplos en [DECISIONS.md](DECISIONS.md)):

| Método | Ruta | Uso |
|--------|------|-----|
| `POST` | `/api/auth/register` | Registro (nombre, email, contraseña) |
| `POST` | `/api/auth/login` | Login; respuesta: `token` y `user` |
| `POST` | `/api/auth/logout` | Cerrar sesión |
| `GET`  | `/api/users/me` | Perfil del usuario autenticado |
| `PUT`  | `/api/users/me` | Actualizar perfil (nombre) |
| `GET`  | `/api/users` | Listado de usuarios (solo admin; paginación y filtros) |

## Scripts npm

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con recarga |
| `npm run build` | Compila TypeScript y genera build de producción |
| `npm run preview` | Sirve el build localmente para pruebas |
| `npm run lint` | Ejecuta ESLint |

## Decisiones de diseño

Ver [DECISIONS.md](DECISIONS.md) para librerías elegidas, desafíos y mejoras futuras.
