# Decisiones de diseño

Este documento resume las decisiones técnicas del proyecto frontend, los problemas encontrados y posibles mejoras futuras.

## Elección de librerías

**Vite.** Se eligió como bundler y servidor de desarrollo por su rapidez (ESM nativo), configuración mínima y buena integración con React y TypeScript. Create React App está en mantenimiento; Vite es la recomendación actual para nuevos proyectos.

**React 18+.** Versión estable con concurrent features y hooks. El proyecto usa estrictamente componentes funcionales y hooks (useState, useEffect, useContext).

**TypeScript.** Tipado estático en todo el código; configuración strict. Tipos para respuestas de API, estado del contexto y props de componentes. Sin uso de `any`.

**React Router.** Navegación entre Login y Perfil; rutas protegidas que redirigen a login si no hay token. Estructura simple (rutas públicas y privadas).

**TanStack Query (React Query).** Gestión de estado asíncrono y caché para las llamadas al backend. Evita estado manual de loading/error en cada página y unifica reintentos e invalidación. Las mutaciones (login, actualizar perfil) se integran con el cliente y el contexto de auth.

**Axios.** Cliente HTTP con interceptores para añadir el token Bearer y manejar 401 (logout y redirección). Alternativa directa a fetch; TanStack Query funciona con ambos.

**shadcn/ui.** Componentes accesibles y personalizables basados en Radix UI y Tailwind. Se copian al proyecto (no es una dependencia opaca), lo que permite ajustar estilos y comportamiento. Se usarán para formularios, botones, cards y feedback de errores.

## Desafíos durante el desarrollo

(Se irán documentando conforme avance el desarrollo: CORS, persistencia del token, manejo de 401 en rutas protegidas, etc.)

## Mejoras con más tiempo

**Página de registro.** Formulario de alta de usuarios que llame a `POST /api/auth/register` y redirija a login.

**Dashboard de administrador.** Ruta solo para `role === 'admin'`; listado de usuarios con `GET /api/users`, paginación y filtros (search, role) usando TanStack Query.

**Tests unitarios.** Vitest o Jest con React Testing Library para componentes críticos (Login, Perfil) y contexto de auth con mocks del API.

**Refresh token.** Si el backend añade refresh token, almacenarlo de forma segura y renovar el access token antes de que expire.

**Variables de entorno validadas.** Comprobar al arranque que `VITE_API_URL` exista y sea una URL válida para evitar errores confusos en runtime.

## Integración con el backend

El frontend asume que el backend expone:

- `POST /api/auth/login` → `{ token, user }`
- `GET /api/users/me` → perfil del usuario (con header `Authorization: Bearer <token>`)
- `PUT /api/users/me` → actualización de nombre (body `{ name }`)

El backend debe configurar CORS para permitir el origen del frontend en desarrollo (por ejemplo `http://localhost:5173`).
