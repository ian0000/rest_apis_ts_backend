# Productos · API REST con TypeScript

**Proyecto de curso y aprendizaje · Express + PostgreSQL**

API para practicar operaciones CRUD sobre productos, validación de entradas, persistencia relacional, documentación Swagger y pruebas de integración.

**Interfaz asociada:** [rest_apis_ts_frontend](https://github.com/ian0000/rest_apis_ts_frontend).

## Tecnologías

Node.js, Express, TypeScript, PostgreSQL, Sequelize, Express Validator, Jest y Supertest.

## Operaciones

La API se monta en `/api/products` e incluye consulta, creación, edición, eliminación y cambio de disponibilidad. La documentación Swagger se configura en `/docs`.

## Desarrollo local

1. Instala las dependencias con `npm install`. Este repositorio no incluye un lockfile de npm ni una versión de Node fijada.
2. Prepara una base PostgreSQL **de desarrollo**.
3. Crea `.env` en la raíz:

   | Variable | Uso |
   | --- | --- |
   | `DATABASE_URL` | Conexión a PostgreSQL |
   | `FRONTEND_URL` | Origen permitido por CORS, por ejemplo `http://localhost:5173` |
   | `PORT` | Puerto; por defecto 4000 |

4. Ejecuta `npm run dev`.

[La conexión actual](src/config/db.ts) solicita SSL y desactiva la comprobación del certificado. Ten en cuenta esa configuración al preparar tu base; el código no está listo para conectarse a cualquier PostgreSQL local sin ajustes. No se modifica esa política desde este README.

## Pruebas: usar exclusivamente una base desechable

**`npm test` ejecuta automáticamente `pretest`, que utiliza `db.sync({ force: true })` y recrea las tablas de la base indicada por `DATABASE_URL`.** `npm run test:coverage` también ejecuta esa limpieza. No apuntes estos comandos a datos que quieras conservar.

Con una base de pruebas separada y su configuración revisada:

```sh
npm test
npm run test:coverage
```

El repositorio contiene Jest/Supertest. Los informes existentes en `coverage/` son artefactos anteriores, no evidencia de una ejecución actual.

## Estructura y comandos

| Ruta | Responsabilidad |
| --- | --- |
| [src/router.ts](src/router.ts) | Rutas y validaciones |
| [src/handlers](src/handlers/) | Operaciones sobre productos |
| [src/model](src/model/) | Modelos de Sequelize |
| [src/config](src/config/) | Base de datos y Swagger |
| [src/data](src/data/) | Limpieza usada por las pruebas |

- `npm run dev`: servidor de desarrollo.
- `npm run build`: compilación TypeScript.
- No hay script `start` ni `lint` declarado.

Material de formación de [Ian K.](https://github.com/ian0000); no se presenta como API de producción.
