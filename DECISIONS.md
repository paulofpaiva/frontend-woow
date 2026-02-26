# Decisiones de diseño

Este documento resume las decisiones técnicas del proyecto frontend, los problemas encontrados y posibles mejoras futuras.

## Elección de librerías

**Vite.** Se eligió como bundler y servidor de desarrollo por su rapidez (ESM nativo), configuración mínima y buena integración con React y TypeScript. Create React App está en mantenimiento; Vite es la recomendación actual para nuevos proyectos.

**React 18+.** Versión estable con concurrent features y hooks. El proyecto usa estrictamente componentes funcionales y hooks (useState, useEffect, useContext).

**TypeScript.** Tipado estático en todo el código; configuración strict. Tipos para respuestas de API, estado del contexto y props de componentes. Sin uso de `any`.

**Zustand (en lugar de Context API para auth).** La prueba sugiere `contexts/` con Context API para el estado de autenticación. Se eligió Zustand porque: (1) evita re-renders en cascada — solo los componentes que suscriben a `token` o `user` se actualizan, no todo el árbol bajo un AuthProvider; (2) el estado se puede leer fuera de componentes (por ejemplo en el cliente Axios o en guards) sin pasar props; (3) el middleware `persist` guarda token y user en localStorage con muy poco código; (4) testing más simple — no hace falta envolver con providers en cada test. La estructura del proyecto usa `stores/` en lugar de `contexts/` por esta decisión.

**React Router.** Navegación entre Login y Perfil; rutas protegidas que redirigen a login si no hay token. Estructura simple (rutas públicas y privadas).

**TanStack Query (React Query).** Gestión de estado asíncrono y caché para las llamadas al backend. Evita estado manual de loading/error en cada página y unifica reintentos e invalidación. Las mutaciones (login, actualizar perfil) se integran con el cliente y el contexto de auth.

**Axios.** Cliente HTTP con interceptores para añadir el token Bearer y manejar 401 (logout y redirección). Alternativa directa a fetch; TanStack Query funciona con ambos.

**shadcn/ui.** Componentes accesibles y personalizables basados en Radix UI y Tailwind. Se copian al proyecto (no es una dependencia opaca), lo que permite ajustar estilos y comportamiento. Se usarán para formularios, botones, cards y feedback de errores.

## Desafíos durante el desarrollo

(Se irán documentando conforme avance el desarrollo: CORS, persistencia del token, manejo de 401 en rutas protegidas, etc.)

## Mejoras con más tiempo

**Refresh token.** Si el backend añade refresh token, almacenarlo de forma segura y renovar el access token antes de que expire.

**Variables de entorno validadas.** Comprobar al arranque que `VITE_API_URL` exista y sea una URL válida para evitar errores confusos en runtime.

## Integración con el backend

El frontend consume los siguientes endpoints del backend. Todos los que requieren autenticación usan el header `Authorization: Bearer <token>` (o cookie cuando `withCredentials: true`).

**Health**

- `GET /api/health` — Estado del servicio y de la base de datos. No requiere autenticación.

**Auth**

- `POST /api/auth/register` — Registro de usuarios. Body: `{ name, email, password }`. Respuesta 201: `{ message }`.
- `POST /api/auth/login` — Login. Body: `{ email, password }`. Respuesta 200: `{ token, user }`. El backend puede enviar además el token en cookie httpOnly.
- `POST /api/auth/logout` — Cerrar sesión (limpia la cookie de sesión en el servidor). Respuesta 200: `{ message }`.

**Usuarios**

- `GET /api/users/me` — Perfil del usuario autenticado. Respuesta 200: `{ id, name, email, role }`.
- `PUT /api/users/me` — Actualizar perfil (solo nombre). Body: `{ name }`. Respuesta 200: `{ message, user }`.
- `GET /api/users` — Listado de usuarios (solo admin). Query opcionales: `page`, `limit`, `search`, `role`. Respuesta 200: `{ users, pagination }`.

El backend debe configurar CORS con `origin` explícito (por ejemplo `http://localhost:5173`) y `credentials: true` para que login/logout con cookie funcionen desde el frontend.
