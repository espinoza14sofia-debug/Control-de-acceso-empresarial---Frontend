# ControlAccesoEmpresarial — Frontend

Frontend en React + TypeScript + Vite para el backend NestJS de **ControlAccesoEmpresarial**.
La arquitectura fue creada analizando exclusivamente los 9 módulos reales del backend
(controllers, DTOs, roles) — no contiene funcionalidades ni endpoints inventados.

## Stack

- React 19 + TypeScript
- Vite
- React Router (rutas públicas/privadas + guardas por rol)
- TanStack Query (cache y sincronización con el backend)
- react-hook-form (formularios)
- Axios (cliente HTTP, con interceptor de refresh token)
- Tailwind CSS v4 (sistema visual base)

## Cómo correrlo

```bash
npm install
cp .env.example .env.development   # ya viene creado con la URL local por defecto
npm run dev
```

Por defecto apunta a `http://localhost:3000` (el backend NestJS corriendo en local).
Cambia `VITE_API_BASE_URL` en `.env.development` si tu backend corre en otro puerto o URL.

## Verificación

Este proyecto fue verificado antes de la entrega:

```bash
npx tsc --noEmit -p tsconfig.app.json   # 0 errores de tipos
npm run build                            # build de produccion exitoso
npx oxlint                               # 0 errores de lint (1 warning menor, no bloqueante)
```

## Estructura

Ver el árbol completo de carpetas dentro de `src/`. Organizado por **features**, uno por
cada módulo real del backend: `auth`, `usuarios` (incluye empleados), `departamentos`,
`visitantes`, `preregistros`, `accesos` (incluye reportes), `notificaciones`, `auditoria`,
`tablero`. Cada feature trae sus propios `types/`, `services/`, `hooks/`, `components/`
y `pages/`.

Componentes genéricos (sin conocimiento de negocio) viven en `src/components/`.
Layouts en `src/layouts/`. Sesión global en `src/context/AuthContext.tsx`.

## Estado de la implementación

Todo lo incluido es **código funcional real**: tipos que coinciden con los DTOs del
backend, servicios que llaman a los endpoints reales, formularios con validación,
tablas con columnas reales, hooks de React Query conectados. No hay datos simulados
ni pantallas placeholder — el proyecto compila y construye limpio, y queda listo para
seguir desarrollando encima (ajustar estilos, agregar validaciones adicionales, pulir
UX) sin necesidad de reorganizar nada.

## Notas importantes (ver también el código, comentado en los puntos clave)

- El backend no expone `GET /auth/me`: el perfil del usuario se guarda en sesión
  desde la respuesta de `/auth/login` (ver `src/context/AuthContext.tsx`).
- Los endpoints de reporte (`/accesos/reporte-excel`, `/accesos/reporte-pdf`) devuelven
  binarios, no JSON — el `apiClient` los maneja como `blob` (ver `descargarBlob` en
  `src/services/apiClient.ts`).
- `POST /usuarios/:id/foto` usa `multipart/form-data` — manejado aparte con
  `subirArchivo` en el mismo archivo.
- La matriz de roles por ruta en `src/app/router.tsx` y `src/components/navigation/Sidebar.tsx`
  replica exactamente los decoradores `@Roles(...)` de cada controlador del backend.
