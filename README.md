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

* ATTENTION * This will erase all data from the DB and load the initial state.

## API methods

The API is accessed at /apiv1

Documentation:

- /api-docs/

Examples /apiv1/ads:

Filters:
- http://localhost:3000/apiv1/ads/?name=Bicicleta&sale=true&tags=motor&minprice=50&maxprice=500

Pagination:
- http://localhost:3000/apiv1/ads/?skip=1&limit=1

Select fields:
- http://localhost:3000/apiv1/ads/?select= name -_id

Sort:
- http://localhost:3000/apiv1/ads/?sort=price 


## web

- /

Examples / :

Filters:
- http://localhost:3000/?name=Bicicleta&sale=true&tags=motor&minprice=50&maxprice=500

Pagination:
- http://localhost:3000/?skip=1&limit=1

Sort:
- http://localhost:3000/?sort=price 