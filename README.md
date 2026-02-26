# Frontend Woow Technology

![Woow Technology](woow_logo.jpeg)

Este repositorio corresponde al frontend del assignment técnico solicitado por [WoowTechnology SAS](https://woowtechnologysas.com/) como parte del proceso de selección para la vacante de desarrollador de software.

Aplicación React para autenticación y perfil de usuario. Consume la API REST del proyecto [backend-woow](https://github.com/WoowTechnology/backend-woow) (login, perfil, listado de usuarios para admin).

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
├── contexts/     # Context API (auth)
├── types/        # Interfaces TypeScript
└── App.tsx       # Entry point, rutas y providers
```

## Credenciales de prueba

Para probar el login usa el usuario administrador creado por el backend (tras ejecutar las migraciones):

* Email: `admin@gmail.com`
* Contraseña: `12345678`
* Rol: `admin`

Para probar como usuario normal, regístrate desde el backend (`POST /api/auth/register`) con otro email y luego inicia sesión desde el frontend.

## Scripts npm

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con recarga |
| `npm run build` | Compila TypeScript y genera build de producción |
| `npm run preview` | Sirve el build localmente para pruebas |
| `npm run lint` | Ejecuta ESLint |

## Decisiones de diseño

Ver [DECISIONS.md](DECISIONS.md) para librerías elegidas, desafíos y mejoras futuras.
