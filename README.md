# NodePop

To start the application use:

```sh
npm install
```

In production:

```sh
npm start
```

In development:

```sh
npm run dev
```

Init DB:

```sh
npm run initdb
```

* ATENCION * Esto borrará todos los datos de la BD y cargará el estado inicial.

## Métodos del API

El API se accede en /api

Lista de anuncios:

- /apiv1/ads

Filtros:
- http://localhost:3000/apiv1/ads/?name=Bicicleta&sale=true&tags=motor&minprice=50&maxprice=500

Paginación:
- http://localhost:3000/apiv1/ads/?skip=1&limit=1

Eligiendo que campos quiero:
- http://localhost:3000/api/agentes/?select=name -_id address

Ordenación:
- http://localhost:3000/apiv1/ads/?sort=price name

Lista de tags existentes

- /api/agentes/tags

Crear un anuncio:

- POST /api/anuncios
